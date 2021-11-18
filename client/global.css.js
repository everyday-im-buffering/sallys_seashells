import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
img {
    display: block;
    width:  200px;
    height: 200px;
    border-radius: 15px;
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