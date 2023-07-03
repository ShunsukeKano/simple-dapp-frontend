// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CounterContract {
    uint256 private _count;

    // Events
    event EmitResults(uint256 oldValue, uint256 newValue);

    constructor() {}

    // Increment function
    function increment() public {
        _count = _updateCount(_count, true);
        emit EmitResults(_count - 1, _count);
    }

    // Decrement function
    function decrement() public {
        require(_count > 0, "Counter: cannot decrement below 0");
        _count = _updateCount(_count, false);
        emit EmitResults(_count + 1, _count);
    }

    function getCount() public view returns (uint256) {
        return _count;
    }

    // Private function to update the count
    function _updateCount(uint256 currentCount, bool isIncrement) private pure returns (uint256) {
        return isIncrement ? currentCount + 1 : currentCount - 1;
    }
}
