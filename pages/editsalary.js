import SalaryEditForm from '../components/SalaryEditForm'

const EditSalary = ({ salary }) => {
  
  return (
   <div >
        <SalaryEditForm salary={salary}/>
   </div>
  );
};

export default EditSalary;
