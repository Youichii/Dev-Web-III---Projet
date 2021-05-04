import Hours from '../Hours';

it("testing API Hours", async function () {
    const response = new Hours();
    var data = await response.api();

    expect(data).toEqual([]);
})
