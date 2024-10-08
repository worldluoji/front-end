# Memory Management
Just like modern versions of Objective-C, Swift uses the **ARC (Automatic Reference Counting)** memory management model. The core concept of ARC is actually quite simple — an object is retained in memory by incrementing its reference count, and then released by decrementing that same count. Once an object’s retain count reaches zero — that object is deallocated from memory.

```swift
class Ship {
    var cargo: Cargo?
}

let ship = Ship()
ship.cargo = Cargo()
```
Once we assign a cargo object to a ship, that cargo’s reference count is now one, since the ship is the only other object retaining it.

Our ship’s reference count is actually also one, not because any other object retains it, but because it’s being retained by our local ship variable. 

since we’re not storing our ship anywhere, once the above code has finished executing, here’s what will happen:
- Since our local ship variable will disappear once the above scope has been cleared, the Ship assigned to it will have its reference count decremented by one — reaching zero and thus being deallocated.
- Our Ship held a reference to its Cargo, so since the ship is going out of memory, that cargo’s reference count is also decremented by one — also reaching zero and also becoming deallocated.

<br>

## 循环引用
```swift
class Cargo {
    var ship: Ship?
}

let ship = Ship()
let cargo = Cargo()

// Now, neither our ship or cargo will ever be deallocated,
// since their retain counts will never reach zero.
ship.cargo = cargo
cargo.ship = ship
```
One solution to the above problem is to break the retain cycle, by making one of the references weak. A weak reference doesn’t increment the referenced object’s retain count, while still letting us get access to the object while it’s still in memory — which is really useful in situations like the above.
```swift
class Cargo {
    weak var ship: Ship?
}
```

### Closure引起的循环引用
```swift
ship.unloadObservation = {
    // Since we're using 'ship' here, it gets captured strongly
    // by the closure, causing a retain cycle, since the closure
    // is in turn owned by the ship itself.
    ship.cargo = loadNextCargo()
}
```
Breaking the above retain cycle also involves introducing a weak reference — this time to capture the Ship weakly instead of strongly (which is the default), by adding an explicit capture list to our closure:
```swift
ship.unloadObservation = { [weak ship] in
    // Since the ship is now captured weakly, it becomes an
    // optional within the closure's scope.
    ship?.cargo = loadNextCargo()
}
```

<br>

## reference
https://www.swiftbysundell.com/basics/memory-management/