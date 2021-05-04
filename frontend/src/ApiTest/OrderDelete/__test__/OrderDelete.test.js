import OrderDelete from '../OrderDelete';

it("testing API OrderDelete", async function () {
    const response = new OrderDelete();
    var data = await response.api();

    expect(data).toEqual([]);
})
