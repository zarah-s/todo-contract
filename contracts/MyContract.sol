// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract MyTodo {
    Todo[] todos;

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
}
