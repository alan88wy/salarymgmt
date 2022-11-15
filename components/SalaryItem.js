import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { server } from '../config/index'
import Modal from 'react-modal'
import React, {useState} from 'react';
import EditSalary from '../components/EditSalary';
import DeleteSalary from '../components/DeleteSalary';

function SalaryItem( { salary, token }) {

    const router = useRouter()

    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }


    function handleEdit() {

        if (modalIsOpen) {
            closeModal();
        } else {
            openModal();
        }
        // router.push({
        //     pathname: '/editsalary',
        //     query: { salary },
        // })

//         let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=500,height=500,left=-200,top=200`

//         window.open(`${server}/editsalary`, "Edit Salary", params)
    }

    // Modal.setAppElement(document.getElementById('root'));

    return (
        <Row xs md={5} className='lh-lg bg-secondary rounded-3 bg-opacity-25 border border-3 border-white' >
            <Col >
                { salary.id }
            </Col>
            <Col >
                { salary.name }
            </Col>
            <Col >
                { salary.login }
            </Col>
            <Col >
                { salary.salary }
            </Col>
            <Col >
                <span onClick={handleEdit}>
          
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    <Modal key={router.asPath}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                        className="w-50 h-50 p-4 border border-primary bg-white position-absolute top-50 start-50 translate-middle"
                    >
                        <EditSalary salary={salary} token={token} />
                    </Modal>
                </span>
                <span className="m-2">   </span>
                <span  onClick={ openModal }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <Modal key={router.asPath}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                        className="w-50 h-50 p-4 border border-primary bg-white position-absolute top-50 start-50 translate-middle"
                    >
                        <DeleteSalary salary={salary} />
                    </Modal>
                </span>
            </Col>
            <Col>
            
            </Col>
        </Row>
    )
}

export default SalaryItem