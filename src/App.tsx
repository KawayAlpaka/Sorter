import React from 'react';
import './App.css';
// import { SortPanel } from './components/sort-panel';
// import 'antd/dist/antd.less';
// import 'antd/dist/antd.dark.less';
// import 'less/parent.less'
import 'less/style.less'
import { Header } from 'components/header';
import styled from '@emotion/styled';
import { Footer } from 'components/footer';
import { Main } from 'components/Main';
import {store, useAppSelector} from "store";
import { Provider } from 'react-redux';
import "utils/monaco";


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </Layout>
    </Provider>

  );
}

const Layout = ({children}:{children:React.ReactNode})=>{
  const theme = useAppSelector(s=>s.theme.theme);
  return <LayoutCss className={["App",theme].join(" ")}>
    {children}
  </LayoutCss>
}

const LayoutCss = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
&.light{
  background-color:rgb(247, 247, 247);
}
`

export default App;
