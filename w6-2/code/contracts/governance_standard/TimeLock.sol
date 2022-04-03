

// 等到新的投票提案 执行
// 每个人持有的token必须投票5次
// 如果不喜欢，可以让用户放弃投票


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  // 执行之前需要等待多长时间
  // 提案地址列表
  // 执行地址列表
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors
  ) TimelockController(minDelay, proposers, executors) {}
}