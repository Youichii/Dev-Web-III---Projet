import OrderPut from '../OrderPut';

it("testing API OrderPut", async function () {
    const response = new OrderPut();
    var data = await response.api();

    expect(data).toEqual({"affectedRows": 1, "changedRows": 1, "fieldCount": 0, "insertId": 0, "message": "(Rows matched: 1  Changed: 1  Warnings: 0", "protocol41": true, "serverStatus": 2, "warningCount": 0});
})