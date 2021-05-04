import React from 'react';
import ClientApi from '../AppTest'

it("testing API get", async function () {
    const response = new ClientApi();
    var data = await response.api()


    expect(data[0].IdClient).toEqual(3)
})