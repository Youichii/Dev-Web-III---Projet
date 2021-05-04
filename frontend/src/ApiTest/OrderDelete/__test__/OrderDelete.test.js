import OrderDelete from '../OrderDelete';

it("testing API OrderDelete", async function () {
    const response = new OrderDelete();
    var data = await response.api();

    expect(data).toEqual({"affectedRows": 0, "changedRows": 0, "fieldCount": 0, "insertId": 0, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 0});
})
