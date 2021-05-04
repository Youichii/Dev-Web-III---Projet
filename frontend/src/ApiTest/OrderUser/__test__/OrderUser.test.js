import OrderUser from '../OrderUser';

it("testing API OrderUser", async function () {
    const response = new OrderUser();
    var data = await response.api();

    expect(data).toEqual([]);
})