---
layout: post
title: "Course Content: EEET2368 (centralised DHCP server)"
author: "Jean"
description: "Explanation of a DHCP set up for an RMIT course"
tags: ["course content", "eeet2368", "network engineering"]
---

I don't know if I'll ever refer back to this, or if anyone else will, but this caused 3 days of headaches and constant Googling - too much of a sunken cost to let it rot away in my notebook.

# The problem

In our scenario, we have (with fake IPs for readability):

![Untitled](/images/posts/centralised-DHCP/Untitled.png)

In our scenario, there is only one DHCP server, which will (eventually) be used for multiple LANs - even though the server isn't a part of them. We'll call this setup **centralised**.

This differs to the DHCP setup that we learned originally - where DHCP servers are part of the
network that needs them. We'll call this setup **distributed**.

<details><summary><i>(Optional) note on centralised vs. distributed</i></summary>
    <br>
    I'm not entirely sure why one is used over the other in a real world scenario. This <a href="https://activedirectorypro.com/dhcp-best-practices/#central-vs-distributed">link</a> may help. 
</details>

## **How to setup a centralised DHCP service (Cisco Packet Tracer example)**

> *This assumes that the routers and DHCP server already have IPs addresses, and routing protocols are set).*
> 

This is can be achieved by using the LAN's router as a **DHCP relay agent** - it relays the DHCP requests it receives to the DHCP server.

### 1. The LAN's router needs to know the address of the DHCP server 
    
This is done by configuring the router's **helper address** - which will be set to the DHCP server address. 
    
<details><summary><i>(Optional) note on what is a helper address</i></summary>
        
Brief <a href="https://networkengineering.stackexchange.com/a/41377">explanation here</a> on what a helper address does - it basically lets the router know that it should forward any DHCP requests it receives.
</details>

#### Cisco Packet Tracer Explanation
Let's set the DHCP server as router 2's helper.

*Note: Each interface on the router has its own IP helper address. In my setup, all LAN devices are connected to a switch, which is connected to the router. **If you have more than one switch connected to the router, all of these connections will need to have a helper address.***

1. In CPT, first choose the port that is connected to the LAN. This can be done from the CLI using `interface <port name>`
2. From the CLI, type the command `ip helper-address <DHCP server address>`

In the example below, the router is connected to the LAN through the GigabitEthernet0/0 port. The DHCP server is 0.0.0.1, and the router has the address 2.2.2.2.

![Untitled](/images/posts/centralised-DHCP/Untitled%201.png)

You can also see if the helper address was configured correctly by the `show run` command (remember to `exit` twice before doing so). After a bit of scrolling past unnecessary info, something like this should be displayed:

![Untitled](/images/posts/centralised-DHCP/Untitled%202.png)

If you typed in the wrong helper-address, you can get rid of it by again choosing the port (see step a), then using the command `no ip helper-address <DHCP server address>`

### 2. The DHCP server needs a pool for the LAN
    
This is basically the same as setting up a DHCP server for a network normally. The DHCP server just needs to know what IP addresses it can give the LAN's devices (the pool).

#### Cisco Packet Tracer explanation
    
In this example, the DHCP server has a pool called "LAN Addresses". An important note here is that "LAN Addresses" has the LAN router (2.2.2.2) set as its default gateway.

This is different to the DHCP server's default gateway, which should still be router 1.

![Untitled](/images/posts/centralised-DHCP/Untitled%203.png)

![Untitled](/images/posts/centralised-DHCP/Untitled%204.png)

The DHCP server's default gateway. Router 1 address = 0.0.0.2 in the same network as the DHCP server.

What this configuration basically does is let the DHCP server know what to do with the relayed DHCP request from router 2. It goes:

1. Oh look, **router 1** (default gateway 0.0.0.2) has forwarded me a request from my lovely *DHCP relay agent* **router 2**
2. Let me come up with an IP from "LAN Addresses"...
3. All done. Here you go, **router 1** - please find **router 2** and send it to him, thank you :)

## The end.

> *I hope my explanation isn't too convoluted. Otherwise, feel free to go to [this blog](https://computernetworking747640215.wordpress.com/2018/07/05/ip-helper-address-configuration-in-packet-tracer/) for a similar explanation, personally it helped me a lot*
>