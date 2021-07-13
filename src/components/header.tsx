import { Button, Dropdown, Menu, message, Modal, PageHeader, Popconfirm, Space, Switch, Tag } from "antd";
import { quickSortStr,insertionSortStr, selectionSortStr } from "demo";
import React, { useEffect } from "react";
import { useAppSelector } from "store";
import { Code, CurrentCode, FullCode, getFullCodeById, useAddCode, useDelCode, useResetCode, useSetCodeName, useSetCurrentCode } from "store/code.slice";
import { useSwitchTheme } from "store/theme.slice";
import { AppGlobal } from "utils/global";
import { openCopyPrompt, openPrompt, openPrompt2 } from "utils/modal";
import { Theme } from "utils/switch-theme";
import { defaultCode } from "./code-editor";
import sun from "image/sun.svg";
import moon from "image/moon.svg";
import styled from "@emotion/styled";
import URI from "urijs"
import { useSetTestcase } from "store/test.slice";
import { Open } from "utils/open";
import { useSetDemo } from "hooks/use-set-demo";



export const Header = ()=>{

  const currentCode = useAppSelector(state=>{
    return state.code.currentCode;
  });
  const codeList = useAppSelector(state=>{
    return state.code.list;
  });
  const saveCode = useAddCode();
  const setCurrentCode = useSetCurrentCode();
  const save = ()=>{
    openPrompt2("【本地储存】请输入要保存名称",`排序${codeList.length+1}`).then((value)=>{
      console.log(value);
      if(!value){
        message.warning('输入名称后才能储存');
      }else{
        if(currentCode.id){
          // 新建操作
          saveCode({
            code:defaultCode,
            name:value
          });
        }else{
          // 保存操作
          const code = AppGlobal.editor?.getValue();
          if(code){
            saveCode({
              code,
              name:value
            });
          }
          message.success("保存成功");
        }

      }
    });
  }
  const setCodeName = useSetCodeName();
  const clickCurrentName = (currentCode:CurrentCode)=>{
    if(currentCode.id){
      // currentCode = currentCode as FullCode;
      openPrompt("【本地储存】请输入新的名称",currentCode.name).then((value)=>{
        console.log(value);
        if(!value){
          message.warning('输入名称后才能继续');
        }else{
          setCodeName({
            ...currentCode,
            name:value,
            id:currentCode.id || ""
          });
          message.success("更新成功");
        }
      });
    }else{
      save()
    }
  }

  const setCode = (code:Code)=>{
    const editor = AppGlobal.editor;
    if(editor && code.id){
      const fullCode = getFullCodeById(code.id) as FullCode;
      setCurrentCode(fullCode);
      // editor.setValue(fullCode.code);
    }
  }

  const setDemo = useSetDemo();
  const extra = [];
  extra.push(<Dropdown key="1"
  overlay={
    <Menu>
      <Menu.Item key="select" onClick={()=>setDemo(selectionSortStr)}>
        选择排序
      </Menu.Item>
      <Menu.Item key="insert" onClick={()=>setDemo(insertionSortStr)}>
        插入排序
      </Menu.Item>
      <Menu.Item key="quick" onClick={()=>setDemo(quickSortStr)}>
        快速排序
      </Menu.Item>
    </Menu>
  }
>
  <Button key="1" type="primary">示例</Button>
</Dropdown>);
  const delCode = useDelCode();
  if(codeList.length > 0 ){
    const deleteCode = (code:Code,evt:React.MouseEvent)=>{
      evt.preventDefault();
      evt.stopPropagation();
      Modal.confirm({
        title:`确认要删除【${code.name}】吗?`,
        onOk:()=>{
          delCode(code);
        }
      });
    }
    extra.push(<Dropdown.Button type="primary" key="2"
    onClick={()=>clickCurrentName(currentCode)}
    overlay={
          <Menu>
            {
              codeList.map(item=>(<Menu.Item onClick={()=>setCode(item)} key={item.id}>
                  <Tag closable onClose={evt=>deleteCode(item,evt)}>{item.name}</Tag>
                </Menu.Item>))
            }
          </Menu>
        }
      >
      {currentCode.name || "未保存" }
    </Dropdown.Button>)
  }
  extra.push(<Button key="3" type="primary" onClick={save}>{currentCode.id ? "新建" : "保存"}</Button>)


  const resetCode = useResetCode();

  extra.push(<Popconfirm
    key="4"
    placement="bottomRight"
    title={"重置会移除当前正在编辑的算法，是否继续?"}
    onConfirm={resetCode}
    okText="Yes"
    cancelText="No"
  >
    <Button key="4" type="default">重置</Button>
  </Popconfirm>)

  const setTestcase = useSetTestcase()
  useEffect(()=>{
    const query = URI.parseQuery(URI(window.location.href).query());
    console.log(query);
    if(query.code){
      const code = decodeURIComponent(query.code as string);
      setCurrentCode({
        code
      });
      AppGlobal.editor?.setValue(code);
    }
    if(query.case){
      setTestcase(query.case as string)
    }
    window.history.replaceState("","","/");
  // eslint-disable-next-line
  },[]);


  const testcase = useAppSelector(state=>{
    return state.test.testcase;
  });
  const share = ()=>{
    let code = AppGlobal.editor?.getValue();
    if(!code){
      message.warn("没有代码无法分享")
      return;
    }
    const query:any = {} ;
    query.code = code;

    if(testcase){
      query.case = testcase
    }
    
    const shareUrl = URI(window.location.origin).query(query).href();
    const tip = shareUrl.length > 4000 ? `代码比较长(${shareUrl.length})，可能部分浏览器无法打开` : undefined;
    openCopyPrompt({title:"复制下面的链接后即可转发",copyData:shareUrl,tip});

  }

  extra.push(<Button key="5" type="primary" onClick={share}>分享</Button>)

  

  extra.push(<Button key="6" type="link" onClick={Open.help}>帮助</Button>)
  
  const theme:Theme = useAppSelector(s=>s.theme.theme)

  const switchTheme = useSwitchTheme();

  return <PageHeader
    className="site-page-header"
    title="Sorter"
    subTitle={<Space>
      <span>一个排序算法动态演示工具</span>
      {/* <Moon width={14} height={14}></Moon> */}
      <Switch key="4" checkedChildren={<SwitchIcon src={moon} />} unCheckedChildren={<SwitchIcon src={sun} />} checked={theme==="dark"} onChange={(e)=>switchTheme()} />
    </Space>
    }
    extra={<Space>
      {extra}
    </Space>}
  />
}

const SwitchIcon = styled.img`
margin-bottom: 2px;
height: 15px;
`