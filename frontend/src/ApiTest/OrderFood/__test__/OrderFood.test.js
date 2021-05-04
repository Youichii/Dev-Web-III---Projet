import OrderFood from '../OrderFood';

it("testing API OrderFood", async function () {
    const response = new OrderFood();
    var data = await response.api();

    expect(data).toEqual([]);
})
