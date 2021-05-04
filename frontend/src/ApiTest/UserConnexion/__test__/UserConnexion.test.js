import UserConnexion from '../UserConnexion';

it("testing API UserConnexion", async function () {
    const response = new UserConnexion();
    var data = await response.api();

    expect(data[0]).toEqual({"IdClient": 1});
})