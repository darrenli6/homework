pragma solidity ^0.6.0;

interface IScore {

  function addStudent(string calldata _name,uint8 _score ) external ;
  function modifyStudent(uint sid,string calldata _name,uint8 _score ) external ;
}


contract Score is IScore{

    struct Student{
        string name;
        uint8 score;
    }
    
    uint public _numStudents;

    mapping(uint=>Student) public  _students;

    address _adminAddress;

    constructor() public{
        _numStudents=0;
        _adminAddress=msg.sender;
    }
 
    // 添加学生成绩
    function addStudent(string calldata _name,uint8 _score ) external override  { 
       require(bytes(_name).length >0,"必须有学生行吗");
       require(_score<=100,"不能大于100分");
       _students[_numStudents].name=_name;
       _students[_numStudents].score=_score;
       _numStudents++;

    }


    // 修改学生成绩

    function modifyStudent(uint sid,string calldata _name,uint8 _score ) external override { 
       require(bytes(_name).length >0,"必须有学生行吗");
       require(_score<=100,"不能大于100分");
       _students[sid].name=_name;
       _students[sid].score=_score;

    }

 

}

contract Teacher{
     
    IScore s;

    
 


    mapping(address => address ) owner;

    modifier onlyTeacher(){
        require(owner[msg.sender]!=address(0),"批阅老师不能为空");
        _;
    }

    function pushMap(address ele) public{
          owner[ele]=ele;
    } 
      
    function setScore(address addr) public {
         s =IScore(addr);
                
     }
  
        // 添加学生成绩
    function addStudent(string calldata _name,uint8 _score ) external onlyTeacher { 
       s.addStudent(_name,_score);

    }


    // 修改学生成绩

    function modifyStudent(uint sid,string calldata _name,uint8 _score ) external   onlyTeacher { 
       s.modifyStudent(sid,_name,_score);
    }
}