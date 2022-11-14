import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SalaryItem( { salary }) {
    return (
        <>
        
            <Row xs md={4} className='lh-lg bg-secondary rounded-3 bg-opacity-25 border border-3 border-white' >
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
            </Row>
        </>
    )
}

export default SalaryItem