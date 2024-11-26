#!/usr/bin/python3
"""Making Change Problem"""


def makeChange(coins, total):
    """Determines the minimum number of coins needed to make change"""
    if total <= 0:
        return 0

    coins.sort(reverse=True)  # Sort coins in descending order
    count = 0
    for coin in coins:
        if total == 0:
            break
        count += total // coin
        total %= coin

    return count if total == 0 else -1
