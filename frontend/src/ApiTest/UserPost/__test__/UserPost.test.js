import UserPost from '../UserPost';

it("testing API UserPost", async function () {
    const response = new UserPost();
    var data = await response.api();

    expect(data).toEqual("");
})