###A datatable helper package to handle Datatable server side processing for NodeJS with MySQL.

I have written complete tutorial on it's usage [here](https://newcodingera.com/datatables-server-side-processing-using-nodejs-mysql/)

**Basic Example**

```
// Datatable route to get the data
app.get("/data", (req, res, next) => {

  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;

  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "name",
      dt: 0
    },
    {
      db: "email",
      dt: 1
    },
    {
      db: "contact",
      dt: 2
    },
    {
      db: "birthdate",
      dt: 3
    },
    {
      db: "address",
      dt: 4
    }
  ];

  // our database table name
  const tableName = "users"

  // NodeTable requires table's primary key to work properly
  const primaryKey = "user_id"
  
  const nodeTable = new NodeTable(requestQuery, db, tableName, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }

    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});
```