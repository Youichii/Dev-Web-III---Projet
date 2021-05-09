import GenreGet from '../GenreGet';

it("testing API GenreGet", async function () {
    const response = new GenreGet();
    var reponse = await response.api();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");
})
