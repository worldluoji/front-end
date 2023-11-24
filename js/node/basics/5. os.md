# os
在Node.js中，提供了一个os模块，可以使用该模块中的各种方法来获取运行应用程序的操作系统的各种信息，这些方法均不使用任何参数。

## endianness
该方法用于获取CPU的字节序（endianness），可能返回的值为“BE”及“LE”。
```
os.endianness()
```

## hostname
该方法用于获取计算机名。
```
os.hostname()
```

## type
该方法用于获取操作系统类型。
```
os.type()
```

## platform
该方法用于获取操作系统平台。
```
os.platform()
```

## arch
该方法用于获取CPU架构。
```
os.arch()
```

## release
```
os.release()
```

## uptime
该方法用于获取系统的当前运行时间，单位为秒。
```
os.uptime()
```

## totalmem
该方法返回系统的总内存量，单位为字节。
```
os.totalmem();
```

## freemem
该方法返回系统的空闲内存量，单位为字节。
```
os.freemem()
```

## cpus
该方法返回一个数组，其中存放了所有CPU内核的各种信息，包括CPU规格、运行速度（单位为MHz）及运行时间信息。
```
os.cpus()
```

## EOL属性
EOL常量值为操作系统中使用的换行符。
```
os.EOL
```