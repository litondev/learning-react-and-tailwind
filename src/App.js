import Skeleton from 'react-loading-skeleton'
import {useState,useEffect} from 'react';

export default function App() {
  const [isLoadingPage,setIsLoadingPage] = useState(true);
  const [items,setItems] = useState(true);
  const [mode,setMode] = useState('light');
  const per_page = 20;

  useEffect(() => { 
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        setMode("dark");
      } else {
        document.documentElement.classList.remove('dark')
        setMode("light");
      }

      document.body.classList.add('bg-neutral-50','dark:bg-slate-800');
     
      window.$axios.get("/popular")
      .then(res => {
        console.log(res.data);
        setItems(res.data);
        setIsLoadingPage(false);
      })
      .catch(err => {
        console.log(err);
        alert("Terjadi Kesalahan Saat Mengambil Data");
      });
  },[]);

  const truncateString = (str,max = 30) => {
    return str.length > max ? str.substring(0, 25) + " . . ." : str;
  }

  const changeMode = () => {
    if(mode === 'light'){
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem("theme","dark");   
      setMode("dark");
    }else{
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme","light");      
      setMode("light");
    }
  }

  const nexMovie = () => {

  };

  if(isLoadingPage){
    return (
      <div>
        <div className="container-fluid mx-auto px-40">
          <Skeleton className='fixed top-0 left-0 right-0 h-10'/>

          <div className="flex flex-col flex-wrap w-full mt-14 
            md:flex-col            
            sm:flex-col
            lg:flex-row
            xl:flex-row">
            {
              Array.from(new Array(per_page)).map(item => 
                <div className="w-full lg:w-1/4 h-52 my-2"
                  key={item}>
                  <Skeleton className="h-full w-4/5"/>
                </div>
              )
            }           
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 h-14 shadow-sm z-10 bg-white dark:bg-slate-900 dark:text-white py-4'>
        <div className="container mx-auto lg:px-40 px-2 flex justify-between">
          <div>MovieApp</div>

          <div className="flex justify-between">
            <input type="text"
              placeholder="Cari Movie . . ."
              className="border-2	border-slate-200 bg-white px-2 text-black border-x-0 border-t-0 focus:outline-0 dark:bg-slate-700 dark:border-0 dark:text-white text-[12px]"/>
            <div className="mx-2 text-[10px] cursor-pointer" 
              onClick={changeMode}>
              <div className="text-center">
                {mode === 'light' && <i className="fa fa-moon"></i>}
                {mode === 'dark' && <i className="fa fa-sun"></i>}
              </div>
              <div className='text-center'>Mode</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-auto lg:px-40">      
        <div className="
          flex 
          flex-col 
          flex-wrap 
          w-full 
          mt-20 
          lg:flex-row
          ">
          {
            items.results.map(item => 
              <div className="w-full lg:w-1/4 h-96 my-2 cursor-pointer"
                key={item.id}>
                <div class="bg-white shadow-sm h-full w-4/5 rounded-lg dark:bg-slate-900 mx-auto">
                  <img src={'https://www.themoviedb.org/t/p/w220_and_h330_face/' + item.poster_path} 
                    className="w-full h-3/4 object-cover rounded-lg"/>

                  <div class="text-[12px] text-slate-700 my-2 mx-2 dark:text-white">
                    {truncateString(item.title)}
                  </div>

                  <div class="flex justify-between my-2 mx-2 text-slate-700 dark:text-white text-[11px]">
                    <div class="text-center">
                      Rating 
                      <br/>
                      <i class="fa fa-star"></i>
                      <br/>
                      {item.vote_average}
                    </div>

                    <div class="text-center">
                      Vote 
                      <br/>
                      <i class="fa fa-users"></i>
                      <br/>
                      {item.vote_count}
                    </div>

                    <div class="text-center">
                      View 
                      <br/>
                      <i class="fa fa-eye"></i>
                      <br/>
                      {item.popularity}
                    </div>
                  </div>                                
                </div>          
              </div>
            )
          }           
        </div>
      </div>
    </div>
  );
}