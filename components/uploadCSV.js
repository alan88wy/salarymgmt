import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function UploadCSV() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const input = fileName.files[0];

        // console.log(input)

        const reader = new FileReader();

        reader.readAsText(input);

        reader.onload = async (e) => {
            

        // reader.onload = async (e) => {
            // const text = e.target.result;
            const text = reader.result;
            const data = csvToArray(text);
            // const data = CSVToJSON(text);
            const JSONdata = JSON.stringify(data)
            
            // document.write(JSON.stringify(data));

        // API endpoint where we send form data.
        const endpoint = '/api/salaries'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
    };
    
    reader.onerror = function() {
        console.log(reader.error);
    };
    

        setValidated(true);
    }

    return (
        // <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fileName">
            <Form.Label>Please Enter the file name</Form.Label>
            <Form.Control type="file" accept=".csv" placeholder="Enter CSV file name" />
            <Form.Text className="text-muted">
            Please choose a csv file.
            </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function csvToArray(str, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\r")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row

    const s = str.replace(/[\r]/gm, '');
    const rows = s.slice(str.indexOf("\n") ).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {

        const values = row.split(delimiter);

        if (values.length < 4) {
            return
        }

        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    // return the array
    return arr;
  }

const CSVToJSON = (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map(v => {
        const values = v.split(delimiter);
        return titles.reduce(
            (obj, title, index) => ((obj[title] = values[index]), obj),
            {}
        );
        });
};

export default UploadCSV