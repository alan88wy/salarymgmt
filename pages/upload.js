import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Router from 'next/router';
import { useState } from 'react';
// import { useRouter } from "next/router";

export default function Home() {

    const [validated, setValidated] = useState(false);

    let inserted = 0
    let updated = 0
    let discarded = 0

    // const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const input = fileName.files[0];

        const reader = new FileReader();

        reader.readAsText(input);

        reader.onload = async (e) => {

            const text = reader.result;
            const data = csvToArray(text);
            const JSONdata = JSON.stringify(data)

            // API endpoint where we send form data.
            const endpoint = '/api/salaries'

            // Form the request for sending data to the server.
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            }

            const response = await fetch(endpoint, options)

            const result = await response.json()

            Router.push({
                pathname: '/success',
                query: { message: "Successfully processed CSV file!", 
                         processed: result.processed, 
                         discarded: result.discarded },
              })

      };
      
      reader.onerror = function() {
          console.log(reader.error);
      };
      

      setValidated(true);

    }

    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fileName">
            <Form.Label>Please Enter the file name</Form.Label>
            <Form.Control type="file" accept=".csv" placeholder="Enter CSV file name" />
            <Form.Text className="text-muted">
            Please choose a csv file.
            </Form.Text>

            <Form.Text className="text-muted">
            Please choose a csv file.
            </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
          
        </Form>
    )
}

function csvToArray(str, delimiter = ",") {

  const headers = str.slice(0, str.indexOf("\r")).split(delimiter);

  const s = str.replace(/[\r]/gm, '');
  const rows = s.slice(str.indexOf("\n") ).split("\n");

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