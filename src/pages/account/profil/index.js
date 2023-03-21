import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import {useRouter} from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";

const Index = () => {  

  const { isLogged, user, updateUser } = useContext(UserContext);
  
  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [isOpen , setIsOpen] = useState(false);

  const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:"/user", method:"PUT", body:userForm, token:token})

  useEffect(() => {
    setUserForm(user)
  }, [user]);
  
  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      updateUser(dataUpdate.user)
    }
  }, [dataUpdate]);

  if (loadingUpdate) return <Loading />
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setToken(token);
    fetchDataUpdate();
    if (dataUpdate.success) {
      setIsOpen(false);
    }
  }
  
  return (
    <div>
      {
        isOpen && (
          <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
              <Input 
              label="firstName" 
              type="text" 
              name="firstName" 
              value={userForm.firstName}
              isRequired={true}
              placeholder="enter your firstName"
              onChange={(e) => handleChange(e)}
              />
              <Input 
              label="lastName" 
              type="text" 
              name="lastName" 
              value={userForm.lastName}
              isRequired={true}
              placeholder="enter your lastName"
              onChange={(e) => handleChange(e)}
              />
              <Input 
              label="email" 
              type="text" 
              name="email" 
              value={userForm.email}
              isRequired={true}
              placeholder="enter your email"
              onChange={(e) => handleChange(e)}
              />
              <Button type="submit" title="modifier" className="btn__primary"/>
           </form>
          </Modal>
        )
      }
      <p>Profil page</p>
      {
        user && (
          <>
            <p>Firstname : {user.firstName}</p>
            <p>LastName : {user.lastName}</p>
            <p>Email : {user.email}</p>
          </>
        )
      }
      <Button title="modifier" className="btn__primary" type="button" handleClick={ 
        () => {
          setIsOpen(true);
        }
      } />
    </div>
  );
}

export default Index;
