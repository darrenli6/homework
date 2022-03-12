import React from 'react'
import { Tab } from 'semantic-ui-react'
import BasicInfoTab from "./basicInfoTab/BasicInfoTab";
import Erc20Tab from "./erc20Tab/Erc20Tab";
import OperationTab from "./operationTab/OperationTab";
const panes = [
  { menuItem: '基本信息', render: () => <Tab.Pane><BasicInfoTab /></Tab.Pane> },
  { menuItem: 'ERC20信息', render: () => <Tab.Pane><Erc20Tab /></Tab.Pane> },
  { menuItem: '操作', render: () => <Tab.Pane><OperationTab /></Tab.Pane> },
]

const TabCenter = () => <Tab panes={panes} />

export default TabCenter