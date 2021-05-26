import ReactGA from 'react-ga';

export const initGA = () => {
    ReactGA.initialize('G-X4NE1ZB97L');   
}

export const GApageVue = (page)=>{
    ReactGA.pageview(page);
}