import { textDecoration } from '@chakra-ui/react';
import { connect } from '@textile/tableland';

export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  dob: Date;
  employer: string;
  title: string;
  startdate: Date;
  enddate: Date;
  resp:string;
};

export const state = function () {
  return {
    alertMessage: '',
    tableland: {} as any,
    listTable: [] as any,
    listTableName: '' as string,
    currentTableId: '' as string,
    currentTableName: '' as string,
    currentQueryableName: '' as string,
    members:{}  as Member
  };
};

// store the tableland connection as a private plain Object
const getConnection = function () {
  let connection: any;
  return async function (options?: any) {
    if (connection) return connection;

    connection = await connect({
      host: process.env.validatorHost as string
    });

    return connection;
  };
}();
/*
export type RootState = ReturnType<typeof state>



export const mutations: MutationTree<RootState> = {
  set: function (state: any, data: KeyVal) {
    state[data.key] = data.value;
  }
};
*/
interface KeyVal {
  key: string;
  value: any;
};
export const actions = {
  alert: async function (context:any, params:any) {
    // There are potentially components watching alertMessage that will alter the view
    // e.g. a Toast message
    context.commit('set', {key: 'alertMessage', value: params.message});
    // because this "has side affects" we want it to be async so that callers of alert
    // can await then manipulate the view with the new state
    await wait(0);
  },
  /*connect: async function (context) {
    try {
      // connect to tableland
      console.log(`connecting to validator at: ${process.env.validatorHost}`);
      const tableland = await getConnection({
        host: process.env.validatorHost as string
      });

      const myAddress = await tableland.signer.getAddress();
      const allTables = await tableland.list();

      const listTable = allTables.find((list: any) => {
        return list.name.indexOf(`${listTablePrefix}_${myAddress.slice(2,8).toLowerCase()}`) === 0;
      });

      if (listTable && listTable.name) {
        context.commit('set', {key: 'listTableName', value: listTable.name as string});
        // get all of the user's existing tables
        return await context.dispatch('loadTables');
      }

      await context.dispatch('init');
    } catch (err) {
      throw err;
    }
  },*/
  // do one time create of table that holds all the list information
  init: async function (context:any) {
    try {
      const tableland = await getConnection();

      const listOwner = await tableland.signer.getAddress();
      const listTable = await tableland.create(sql.createListTable(listOwner));

      // store queryable list table name for later use
      context.commit('set', {key: 'listTableName', value: listTable.name});
      return await context.dispatch('loadTables');
    } catch (err) {
      throw err;
    }
  },
  createList: async function (context:any, params:any) {
    try {
      const listName = params.name;
      const tableName = 'todo_' + params.name.trim().replaceAll(' ', '_');
      const tableland = await getConnection();

      const table = await tableland.create(sql.createList(tableName));
      const queryableName = table.name as string;

      // stripping the id from queryable name
      const tableId = queryableName.split('_').pop() as string;
      const listOwner = await tableland.signer.getAddress();
      const listTable = await tableland.query(sql.insertList({
        listTableName: context.state.listTableName,
        listName: listName,
        tableName: queryableName,
        tableId: tableId
      })) as any;

      // refresh the list of all of the user's existing tables
      await context.dispatch('loadTables');

      // Load the new list for the user to interact with
      await context.dispatch('loadTable', {
        name: queryableName
      });
    } catch (err) {
      throw err;
    }
  },
  loadTables: async function (context:any) {
    try {
      const tableland = await getConnection();
      const listOwner = await tableland.signer.getAddress();
      const listTable = await tableland.query(sql.selectListTable(context.state.listTableName)) as any;

      if (!listTable.data) throw new Error('list table cannot be loaded');

      context.commit('set', {key: 'listTable', value: parseRpcResponse(listTable.data)});
    } catch (err) {
      throw err;
    }
  },
  loadTable: async function (context:any, params: {name: string}) {
    try {
      const tableland = await getConnection();
      const queryableName = `${params.name}`;
      const res = await tableland.query(sql.selectTodoTable(queryableName)) as any;

     const members = parseRpcResponse(res.data);

      context.commit('set', {key: 'members', value: members || []});

      context.commit('set', {key: 'currentQueryableName', value: queryableName});
      const currentTable = context.state.listTable.find((list: any) => list.table_name === queryableName);
      if (currentTable && currentTable.list_name) {
        context.commit('set', {key: 'currentTableName', value: currentTable.list_name});
      }
    } catch (err) {
      throw err;
    }
  },
  createTask: async function (context:any) {
    try {
      const dob=new Date();
      const sd=new Date();
      const ed=new Date();
      const task = {id:1000, firstname: 'Alice', lastname: 'Wonderland', dob: dob, employer: 'deHive', title: 'Lead Developer', startdate:sd, enddate:ed, resp:'Build decentralized professional network platform'};
      const tableland = await getConnection();

      // send off async request to Tableland
      const res = await tableland.query(sql.insertTask(context.state.currentQueryableName, task)) as any;

      if (res.error) {
        console.log(res.error);
        await context.dispatch('loadTable', {name: context.state.currentQueryableName});
        return new Error(res.error.message);
      }

      await context.dispatch('loadTable', {name: context.state.currentQueryableName});
      return task;
    } catch (err) {
      throw err;
    }
  }/*,
  updateTask: async function (context, task: Member) {
    try {
      const tableland = await getConnection();
      const res = await tableland.query(sql.updateTask(context.state.currentQueryableName, task)) as any;

      await context.dispatch('loadTable', {name: context.state.currentQueryableName});
    } catch (err) {
      throw err;
    }
  },
  deleteTask: async function (context, task: Member) {
    try {
      const tableland = await getConnection();

      const res = await tableland.query(sql.deleteTask(context.state.currentQueryableName, task.id)) as any;

      await context.dispatch('loadTable', {name: context.state.currentQueryableName});
    } catch (err) {
      throw err;
    }
  }*/
};

/*const getNextId = function (members: Member[]) {
  const taskIds = members.map((task: Member) => members.id).sort((a: number, b: number) => a > b ? 1 : -1);
  const lastId = taskIds[taskIds.length - 1];

  return (lastId || 0) + 1;
};*/

// RPC responds with rows and columns in separate arrays, this will combine to an array of objects
const parseRpcResponse = function (data: {rows: any[], columns: {name: string}[]}) {
  return data.rows.map((rowArr) => {
    const row = {} as {[key: string]: any};
    for (let i = 0; i < data.columns.length; i++) {
      const key = data.columns[i].name;
      row[key] = rowArr[i];
    }

    return row;
  });
};

const compareUuids = function (a: string, b: string) {
  return a.replaceAll(' ', '').replaceAll('-', '') === b.replaceAll(' ', '').replaceAll('-', '');
};

const formatUuid = function (val: string) {
  return [val.slice(0, 8), val.slice(8, 12), val.slice(12, 16), val.slice(16, 20), val.slice(20)].join('-');
};

// this is here for reference only. Creating the table that holds all lists only happens once ever when this app is built
const listTablePrefix = 'todo_app_example_';


/*
 *
 * list_name TEXT, table_name TEXT, table_id TEXT, table_controller TEXT
 *
 */
const sql = {
  createList: (name: string) => `CREATE TABLE ${name} (
    id: number;
    firstname: string;
    lastname: string;
    dob: Date;
    employer: string;
    title: string;
    startdate: Date;
    enddate: Date;
    resp:Text
  );`,
  deleteTask: (name: string, taskId: number) => `
    UPDATE ${name} SET deleted = true WHERE id = ${taskId};
  `,
  insertList: (params: {
    listTableName: string,
    listName: string,
    tableName: string,
    tableId: string
  }) => `
    INSERT INTO ${params.listTableName} (
      list_name,
      table_name,
      table_id
    ) VALUES (
      '${params.listName}',
      '${params.tableName}',
      '${params.tableId}'
    );
  `,
  insertTask: (tableName: string, task: {id: number, firstname: string, lastname: string, dob: Date, employer: string, title: string, startdate: Date, enddate: Date, resp: string}) => `
    INSERT INTO ${tableName} (id, firstname, lastname, dob, employer, title, startdate, enddate, resp) VALUES (${task.id}, '${task.firstname}', ${task.lastname}, ${task.dob}, ${task.employer}, ${task.title}, ${task.startdate}, ${task.enddate},${task.resp}));
  `,
  createListTable: (controllerAddress: string) => `CREATE TABLE ${listTablePrefix}_${controllerAddress.slice(2,10).toLowerCase()} (
    list_name TEXT,
    table_name TEXT,
    table_id TEXT,
    table_controller TEXT
  );`,
  selectListTable: (listTableName: string) => `SELECT * FROM ${listTableName};`,
  selectTodoTable: (name: string) => `SELECT * FROM ${name} ORDER BY id ASC;`/*,
  updateTask: (name: string, task: {complete: boolean, name: string, id: number}) => `
    UPDATE ${name} SET complete = ${task.complete}, name = '${task.name}' WHERE id = ${task.id};
  `*/
};

const wait = function (ms: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(void 0), ms);
  });
};
