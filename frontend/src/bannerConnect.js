/* Barre de navigation */


.navbar{ 
    background-color: black;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 20% 20% 15% 20% 20%;
    grid-template-rows: 100%;
    display: grid;
    width:auto;
    text-align: center;
    font-size: calc(0.5em + 1vw);

}
.navbar li{
    height: fit-content;
}

.navbar a{
    display : block;
    color: white;
    text-decoration: none;
    margin-top:15%;

}

.navbar a:hover{
    color : #dfb54f;
    text-decoration-line: underline;
    text-decoration-color: #dfb54f;
}

#img{
    height: auto;
    width: 100%;
    grid-column:3;
    display: grid;
    margin-left: 15%; 

} 