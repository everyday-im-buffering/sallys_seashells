import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
img {
    display: block;
    width:  500px;
    height: 500px;
    border-radius: 50px;
    padding: 50px;
    object-fit: cover;
}
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica;
    color: ${props => (props.darkMode ? 'white' : 'black')};
  }
`
export default GlobalStyle;