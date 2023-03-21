import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
const Index = () => {

  const { data, error, loading, fetchData } = useFetch({url:"/product/products", method:"GET", body:null, token:null});

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
  }, [data]);

  if(loading) <Loading/> 
  if (error) console.log(error);

  return (
    <div>
      
    </div>
  );
}

export default Index;
