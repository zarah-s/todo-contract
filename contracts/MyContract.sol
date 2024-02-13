// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract MyTodo {
    Todo[] todos;
    uint256 public deleted;
    enum Status {
        Idle,
        Pending,
        Done
    }

    struct Todo {
        uint256 id;
        string title;
        string description;
        uint256 timestamp;
        Status status;
    }

    function createTodo(
        string calldata _title,
        string calldata _description
    ) external {
        todos.push(
            Todo({
                id: todos.length + 1,
                title: _title,
                description: _description,
                timestamp: block.timestamp,
                status: Status.Idle
            })
        );
    }

    function changeStatus(uint256 _id, Status _status) external {
        Todo storage todo = todos[_id - 1];
        todo.status = _status;
    }

    modifier validateId(uint _id) {
        require(_id > 0, "Invalid id");
        require(_id - 1 < todos.length, "Invalid id");
        _;
    }

    function deleteTodo(uint _id) external validateId(_id) {
        delete todos[_id - 1];
        deleted++;
    }

    function getTodos() external view returns (Todo[] memory) {
        Todo[] memory todos_ = new Todo[](todos.length - deleted);
        uint256 _count;
        for (uint256 i = 0; i < todos.length; i++) {
            if (todos[i].timestamp != 0) {
                todos_[_count] = todos[i];
                _count++;
            }
        }
        return todos_;
    }
}
