
import Container from 'react-bootstrap/Container';
import NavBar from '../components/NavBar'
import Meta from '../components/Meta'
import navStyles from '../styles/NavStyles.module.css'

const Layout = ({ children }) => {

    let navColor = navStyles.nav + ' bg-light '
    return (
        <>
            <Meta />
            
            <div className='d-flex flex-row'>
                <NavBar />
                <Container >
                    {children}
                </Container>
                
            </div>
        </>
    )
}

function handleFileUpload(e) {
    const input = csvFile.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        document.write(JSON.stringify(data));
      };
      
      reader.readAsText(input);
}

function csvToArray(str, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
}

export default Layout