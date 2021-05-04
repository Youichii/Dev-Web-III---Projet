import OrderPost from '../OrderPost';

it("testing API OrderPost", async function () {
    const response = new OrderPost();
    var data = await response.api();

    expect(data).toEqual([]);
})