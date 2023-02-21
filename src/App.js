

import "./App.css";
import { Button, Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    console.log("value");

    setFormObject(value);
  };
  const onAdd = () => {
    const idNumber = parseInt(Math.random() * 1000);
    console.log("form", formObject);
    const newdata = {
      id: idNumber,
      name: formObject?.name,
      email: formObject?.email,
      address: formObject?.address,
    };
    setDataSource((previousValue) => {
      return [...previousValue, newdata];
    });
    const isEmpty = { name: "", email: "", address: "" };
    setFormObject(isEmpty);
  };
  const onDelete = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((previousValue) => {
          return previousValue.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onUpdate = () => {
    setDataSource((previousValue) => {
      return previousValue.map((data) => {
        if (data.id === editing.id) {
          return editing;
        } else {
          return data;
        }
      });
    });
    resetEditing();
  };
  const onEdit = (record) => {
    console.log("rec", record);
    setIsEditing(true);
    setEditing({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditing(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        {!isEditing ? (
          <div className="row mb-4 w-50">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={onValChange}
                value={formObject.name}
                name="name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={onValChange}
                value={formObject.email}
                name="email"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Profile"
                onChange={onValChange}
                value={formObject.address}
                name="address"
              />
            </div>

            <Button type="primary" onClick={onAdd}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="row mb-4 w-50">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={editing?.name}
                onChange={(e) => {
                  setEditing((previousValue) => {
                    return { ...previousValue, name: e.target.value };
                  });
                }}
                name="name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={editing?.email}
                onChange={(e) => {
                  setEditing((previousValue) => {
                    return { ...previousValue, email: e.target.value };
                  });
                }}
                name="email"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Profile"
                value={editing?.address}
                onChange={(e) => {
                  setEditing((previousValue) => {
                    return { ...previousValue, address: e.target.value };
                  });
                }}
                name="address"
              />
            </div>
            <div class="d-flex justify-content-around">
              <Button type="primary" onClick={onUpdate}>
                Save
              </Button>
              <Button type="primary" danger onClick={resetEditing}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Table columns={columns} dataSource={dataSource}></Table>
      </header>
    </div>
  );
}

export default App;

