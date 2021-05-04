import UserConnexion from '../UserConnexion';

it("test API UserConnexion valeur existante", async function () {
    const response = new UserConnexion();
    var reponse = await response.test1();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification contenu
    expect(data[0]).toEqual({"IdClient": 1});

    //Vérification du nombre d'éléments reçus
    expect(data.length).toEqual(1);
})

it("test API UserConnexion valeur inexistante mail", async function () {
    const response = new UserConnexion();
    var reponse = await response.test2();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification du contenu
    expect(data.length).toEqual(0);
})

it("test API UserConnexion valeur inexistante mdp", async function () {
    const response = new UserConnexion();
    var reponse = await response.test3();
    var data = reponse.data ;

    //Vérification Status
    expect(reponse.status).toEqual(200);

    //Vérification type contenu
    expect(typeof data).toEqual("object");

    //Vérification du contenu
    expect(data.length).toEqual(0);
})

it("test API UserConnexion valeur vide mail", async function () {
    const response = new UserConnexion();
    var reponse = await response.test4()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})

it("test API UserConnexion valeur vide mdp", async function () {
    const response = new UserConnexion();
    var reponse = await response.test5()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})

it("test API UserConnexion valeurs vides", async function () {
    const response = new UserConnexion();
    var reponse = await response.test6()
    .catch(err => {
        //Vérification Status
        expect(err.response.status).toEqual(404);
    });
})