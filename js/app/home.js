(function() {
    var storage = localStorage;

    initEvent();

    function initEvent() {
        var city = document.querySelector(".City");

        city.addEventListener("click", function() {
            $(".wrapperPage").style.transform = "translateX(0)";
            cityRanderFn();
        });

        $(".close").addEventListener("click", function() {
            $(".wrapperPage").style.transform = "translateX(-100%)";
        });

        var cityScroll = new BScroll(".cityScroll", {
            probeType: 2,
            click: true
        });

        $(".cityDuce").addEventListener("click", function(e) {
            var tarT = e.target;
            if (tarT.nodeName === "LI") {
                //通过当前点击的Id获取到对应的元素 通过scroll.scrollElement(id)跳转到指定位置
                var Cid = document.getElementById(tarT.innerHTML);
                cityScroll.scrollToElement(Cid, 0); //滚动到指定的元素
            }
        });

        $(".contentCity").addEventListener("click", function(e) {
            var tarT = e.target;
            if (tarT.nodeName === "LI" && !tarT.id) {
                var city = tarT.innerHTML;
                document.querySelector(".active").className = "";
                tarT.classList.add("active");

                storage.setItem("city", city);
                $(".City").innerHTML = city;
                $(".posC").innerHTML = city;
            }
        });
    }

    function $(selector) {
        return typeof selector === "string" ? document.querySelector(selector) : selector;
    }



    function cityRanderFn() {
        //Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
        var newCity = Object.keys(city); //取出对象中所有的key(属性)
        console.log(newCity)
        var cityC = "",
            cityM = "";
        newCity.map(function(item) {
            //console.log(item); //所有的key(属性) A B C...
            //console.log(city[item])  根据对应的属性，在对象取出对应的值
            var content = city[item].map(function(item) { //首字母对应的城市
                return item.name === "上海" ? `<li class="active">${item.name}</li>` : `<li>${item.name}</li>`;
            }).join("");

            cityM += `<li>${item}</li>`;
            cityC += ` <li id="${item}">
                        <h2>${item}</h2>
                        <ol>
                           ${content}
                        </ol>
                    </li>`;
        }).join("");
        var contentCity = document.querySelector(".contentCity"),
            cityDuce = document.querySelector(".cityDuce");
        contentCity.innerHTML = cityC;
        cityDuce.innerHTML = cityM;
    }


    Banner();

    function Banner() {
        new Swiper(".banner", {
            autoplay: true,
            loop: true,
            pagination: {
                el: ".bannerPage",
                clickable: true
            }
        });
    };

    var text = storage.getItem("city");
    $(".City").innerHTML = text || "上海";
    $(".posC").innerHTML = text || "正在定位...";


    var menuList = document.querySelector(".menuList"),
        initData = null; //初始化数据

    initData = data.splice(0, 10); //初始化5条数据
    randerFn(initData);

    function randerFn(datas) {
        menuList.innerHTML += datas.map(function(item) {
            return `<dl>
                        <a href="detail.html?title=${item.title}&grade=${item.grade}">
                            <dt>
                                <img src="${item.img}" alt="">
                            </dt>
                            <dd>
                                <h2>${item.title}</h2>
                                <p>
                                    <span class="tag">限时抢购</span>
                                    <span class="price"><b>${item.price}</b> 起</span>
                                </p>
                                <p>
                                    <span class="scroe">${item.grade}</span>
                                    <span class="start">${item.starLevel}</spann>
                                        <i class="iconfont icon-Wifi"></i>
                                        <i class="iconfont icon-tingchechang"></i>
                                </p>
                                <p>
                                    <span class="address">${item.address.join(",")}</span>
                                    <span class="dicetance">${item.distance}公里</span>
                                </p>
                            </dd>
                        </a>
                    </dl>`;
        }).join("");
    }

    scrollFn();

    function scrollFn() {
        var pull = document.querySelectorAll(".pull"),
            H = pull[0].offsetHeight;
        var scrollMenu = new BScroll(".wrapMenuList", {
            probeType: 2,
            click: true
        });

        scrollMenu.on("scroll", function() {
            //this.y 当前滚动的距离
            if (this.y > H) {
                pull[0].innerHTML = "释放刷新";
                pull[0].setAttribute("flag", true);
            } else {
                pull[0].innerHTML = "下拉刷新";
                pull[0].removeAttribute("flag");
            }

            //this.maxScrollY 最大滚动距离
            if (this.y < (this.maxScrollY - H)) {
                pull[1].innerHTML = "释放加载";
                pull[1].setAttribute("flag", true);
            } else {
                pull[1].innerHTML = "上拉加载";
                pull[1].removeAttribute("flag");
            }
        });

        scrollMenu.on("scrollEnd", function() {
            if (pull[0].getAttribute("flag")) {
                location.reload();
            }

            if (pull[1].getAttribute("flag")) {
                var loadData = data.splice(0, 5);
                randerFn(loadData);

                scrollMenu.scrollTo(0, this.maxScrollY - H, 0);
                scrollMenu.refresh();
            }
        });

    };

})();


// bScroll 子元素的高度一定要大于父元素的高度，父元素加：overflow：hidden