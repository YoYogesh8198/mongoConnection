(function() {
    var l = this,
        g, y = l.jQuery,
        p = l.$,
        o = l.jQuery = l.$ = function(E, F) {
            return new o.fn.init(E, F)
        },
        D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
        f = /^.[^:#\[\.,]*$/;
    o.fn = o.prototype = {
        init: function(E, H) {
            E = E || document;
            if (E.nodeType) {
                this[0] = E;
                this.length = 1;
                this.context = E;
                return this
            }
            if (typeof E === "string") {
                var G = D.exec(E);
                if (G && (G[1] || !H)) {
                    if (G[1]) {
                        E = o.clean([G[1]], H)
                    } else {
                        var I = document.getElementById(G[3]);
                        if (I && I.id != G[3]) {
                            return o().find(E)
                        }
                        var F = o(I || []);
                        F.context = document;
                        F.selector = E;
                        return F
                    }
                } else {
                    return o(H).find(E)
                }
            } else {
                if (o.isFunction(E)) {
                    return o(document).ready(E)
                }
            }
            if (E.selector && E.context) {
                this.selector = E.selector;
                this.context = E.context
            }
            return this.setArray(o.isArray(E) ? E : o.makeArray(E))
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length
        },
        get: function(E) {
            return E === g ? Array.prototype.slice.call(this) : this[E]
        },
        pushStack: function(F, H, E) {
            var G = o(F);
            G.prevObject = this;
            G.context = this.context;
            if (H === "find") {
                G.selector = this.selector + (this.selector ? " " : "") + E
            } else {
                if (H) {
                    G.selector = this.selector + "." + H + "(" + E + ")"
                }
            }
            return G
        },
        setArray: function(E) {
            this.length = 0;
            Array.prototype.push.apply(this, E);
            return this
        },
        each: function(F, E) {
            return o.each(this, F, E)
        },
        index: function(E) {
            return o.inArray(E && E.jquery ? E[0] : E, this)
        },
        attr: function(F, H, G) {
            var E = F;
            if (typeof F === "string") {
                if (H === g) {
                    return this[0] && o[G || "attr"](this[0], F)
                } else {
                    E = {};
                    E[F] = H
                }
            }
            return this.each(function(I) {
                for (F in E) {
                    o.attr(G ? this.style : this, F, o.prop(this, E[F], G, I, F))
                }
            })
        },
        css: function(E, F) {
            if ((E == "width" || E == "height") && parseFloat(F) < 0) {
                F = g
            }
            return this.attr(E, F, "curCSS")
        },
        text: function(F) {
            if (typeof F !== "object" && F != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(F))
            }
            var E = "";
            o.each(F || this, function() {
                o.each(this.childNodes, function() {
                    if (this.nodeType != 8) {
                        E += this.nodeType != 1 ? this.nodeValue : o.fn.text([this])
                    }
                })
            });
            return E
        },
        wrapAll: function(E) {
            if (this[0]) {
                var F = o(E, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    F.insertBefore(this[0])
                }
                F.map(function() {
                    var G = this;
                    while (G.firstChild) {
                        G = G.firstChild
                    }
                    return G
                }).append(this)
            }
            return this
        },
        wrapInner: function(E) {
            return this.each(function() {
                o(this).contents().wrapAll(E)
            })
        },
        wrap: function(E) {
            return this.each(function() {
                o(this).wrapAll(E)
            })
        },
        append: function() {
            return this.domManip(arguments, true, function(E) {
                if (this.nodeType == 1) {
                    this.appendChild(E)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(E) {
                if (this.nodeType == 1) {
                    this.insertBefore(E, this.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, false, function(E) {
                this.parentNode.insertBefore(E, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false, function(E) {
                this.parentNode.insertBefore(E, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || o([])
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(E) {
            if (this.length === 1) {
                var F = this.pushStack([], "find", E);
                F.length = 0;
                o.find(E, this[0], F);
                return F
            } else {
                return this.pushStack(o.unique(o.map(this, function(G) {
                    return o.find(E, G)
                })), "find", E)
            }
        },
        clone: function(G) {
            var E = this.map(function() {
                if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
                    var I = this.outerHTML;
                    if (!I) {
                        var J = this.ownerDocument.createElement("div");
                        J.appendChild(this.cloneNode(true));
                        I = J.innerHTML
                    }
                    return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (G === true) {
                var H = this.find("*").andSelf(),
                    F = 0;
                E.find("*").andSelf().each(function() {
                    if (this.nodeName !== H[F].nodeName) {
                        return
                    }
                    var I = o.data(H[F], "events");
                    for (var K in I) {
                        for (var J in I[K]) {
                            o.event.add(this, K, I[K][J], I[K][J].data)
                        }
                    }
                    F++
                })
            }
            return E
        },
        filter: function(E) {
            return this.pushStack(o.isFunction(E) && o.grep(this, function(G, F) {
                return E.call(G, F)
            }) || o.multiFilter(E, o.grep(this, function(F) {
                return F.nodeType === 1
            })), "filter", E)
        },
        closest: function(E) {
            var G = o.expr.match.POS.test(E) ? o(E) : null,
                F = 0;
            return this.map(function() {
                var H = this;
                while (H && H.ownerDocument) {
                    if (G ? G.index(H) > -1 : o(H).is(E)) {
                        o.data(H, "closest", F);
                        return H
                    }
                    H = H.parentNode;
                    F++
                }
            })
        },
        not: function(E) {
            if (typeof E === "string") {
                if (f.test(E)) {
                    return this.pushStack(o.multiFilter(E, this, true), "not", E)
                } else {
                    E = o.multiFilter(E, this)
                }
            }
            var F = E.length && E[E.length - 1] !== g && !E.nodeType;
            return this.filter(function() {
                return F ? o.inArray(this, E) < 0 : this != E
            })
        },
        add: function(E) {
            return this.pushStack(o.unique(o.merge(this.get(), typeof E === "string" ? o(E) : o.makeArray(E))))
        },
        is: function(E) {
            return !!E && o.multiFilter(E, this).length > 0
        },
        hasClass: function(E) {
            return !!E && this.is("." + E)
        },
        val: function(K) {
            if (K === g) {
                var E = this[0];
                if (E) {
                    if (o.nodeName(E, "option")) {
                        return (E.attributes.value || {}).specified ? E.value : E.text
                    }
                    if (o.nodeName(E, "select")) {
                        var I = E.selectedIndex,
                            L = [],
                            M = E.options,
                            H = E.type == "select-one";
                        if (I < 0) {
                            return null
                        }
                        for (var F = H ? I : 0, J = H ? I + 1 : M.length; F < J; F++) {
                            var G = M[F];
                            if (G.selected) {
                                K = o(G).val();
                                if (H) {
                                    return K
                                }
                                L.push(K)
                            }
                        }
                        return L
                    }
                    return (E.value || "").replace(/\r/g, "")
                }
                return g
            }
            if (typeof K === "number") {
                K += ""
            }
            return this.each(function() {
                if (this.nodeType != 1) {
                    return
                }
                if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
                    this.checked = (o.inArray(this.value, K) >= 0 || o.inArray(this.name, K) >= 0)
                } else {
                    if (o.nodeName(this, "select")) {
                        var N = o.makeArray(K);
                        o("option", this).each(function() {
                            this.selected = (o.inArray(this.value, N) >= 0 || o.inArray(this.text, N) >= 0)
                        });
                        if (!N.length) {
                            this.selectedIndex = -1
                        }
                    } else {
                        this.value = K
                    }
                }
            })
        },
        html: function(E) {
            return E === g ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(E)
        },
        replaceWith: function(E) {
            return this.after(E).remove()
        },
        eq: function(E) {
            return this.slice(E, +E + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        },
        map: function(E) {
            return this.pushStack(o.map(this, function(G, F) {
                return E.call(G, F, G)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        domManip: function(J, M, L) {
            if (this[0]) {
                var I = (this[0].ownerDocument || this[0]).createDocumentFragment(),
                    F = o.clean(J, (this[0].ownerDocument || this[0]), I),
                    H = I.firstChild;
                if (H) {
                    for (var G = 0, E = this.length; G < E; G++) {
                        L.call(K(this[G], H), this.length > 1 || G > 0 ? I.cloneNode(true) : I)
                    }
                }
                if (F) {
                    o.each(F, z)
                }
            }
            return this;

            function K(N, O) {
                return M && o.nodeName(N, "table") && o.nodeName(O, "tr") ? (N.getElementsByTagName("tbody")[0] || N.appendChild(N.ownerDocument.createElement("tbody"))) : N
            }
        }
    };
    o.fn.init.prototype = o.fn;

    function z(E, F) {
        if (F.src) {
            o.ajax({
                url: F.src,
                async: false,
                dataType: "script"
            })
        } else {
            o.globalEval(F.text || F.textContent || F.innerHTML || "")
        }
        if (F.parentNode) {
            F.parentNode.removeChild(F)
        }
    }

    function e() {
        return +new Date
    }
    o.extend = o.fn.extend = function() {
        var J = arguments[0] || {},
            H = 1,
            I = arguments.length,
            E = false,
            G;
        if (typeof J === "boolean") {
            E = J;
            J = arguments[1] || {};
            H = 2
        }
        if (typeof J !== "object" && !o.isFunction(J)) {
            J = {}
        }
        if (I == H) {
            J = this;
            --H
        }
        for (; H < I; H++) {
            if ((G = arguments[H]) != null) {
                for (var F in G) {
                    var K = J[F],
                        L = G[F];
                    if (J === L) {
                        continue
                    }
                    if (E && L && typeof L === "object" && !L.nodeType) {
                        J[F] = o.extend(E, K || (L.length != null ? [] : {}), L)
                    } else {
                        if (L !== g) {
                            J[F] = L
                        }
                    }
                }
            }
        }
        return J
    };
    var b = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        q = document.defaultView || {},
        s = Object.prototype.toString;
    o.extend({
        noConflict: function(E) {
            l.$ = p;
            if (E) {
                l.jQuery = y
            }
            return o
        },
        isFunction: function(E) {
            return s.call(E) === "[object Function]"
        },
        isArray: function(E) {
            return s.call(E) === "[object Array]"
        },
        isXMLDoc: function(E) {
            return E.nodeType === 9 && E.documentElement.nodeName !== "HTML" || !!E.ownerDocument && o.isXMLDoc(E.ownerDocument)
        },
        globalEval: function(G) {
            if (G && /\S/.test(G)) {
                var F = document.getElementsByTagName("head")[0] || document.documentElement,
                    E = document.createElement("script");
                E.type = "text/javascript";
                if (o.support.scriptEval) {
                    E.appendChild(document.createTextNode(G))
                } else {
                    E.text = G
                }
                F.insertBefore(E, F.firstChild);
                F.removeChild(E)
            }
        },
        nodeName: function(F, E) {
            return F.nodeName && F.nodeName.toUpperCase() == E.toUpperCase()
        },
        each: function(G, K, F) {
            var E, H = 0,
                I = G.length;
            if (F) {
                if (I === g) {
                    for (E in G) {
                        if (K.apply(G[E], F) === false) {
                            break
                        }
                    }
                } else {
                    for (; H < I;) {
                        if (K.apply(G[H++], F) === false) {
                            break
                        }
                    }
                }
            } else {
                if (I === g) {
                    for (E in G) {
                        if (K.call(G[E], E, G[E]) === false) {
                            break
                        }
                    }
                } else {
                    for (var J = G[0]; H < I && K.call(J, H, J) !== false; J = G[++H]) {}
                }
            }
            return G
        },
        prop: function(H, I, G, F, E) {
            if (o.isFunction(I)) {
                I = I.call(H, F)
            }
            return typeof I === "number" && G == "curCSS" && !b.test(E) ? I + "px" : I
        },
        className: {
            add: function(E, F) {
                o.each((F || "").split(/\s+/), function(G, H) {
                    if (E.nodeType == 1 && !o.className.has(E.className, H)) {
                        E.className += (E.className ? " " : "") + H
                    }
                })
            },
            remove: function(E, F) {
                if (E.nodeType == 1) {
                    E.className = F !== g ? o.grep(E.className.split(/\s+/), function(G) {
                        return !o.className.has(F, G)
                    }).join(" ") : ""
                }
            },
            has: function(F, E) {
                return F && o.inArray(E, (F.className || F).toString().split(/\s+/)) > -1
            }
        },
        swap: function(H, G, I) {
            var E = {};
            for (var F in G) {
                E[F] = H.style[F];
                H.style[F] = G[F]
            }
            I.call(H);
            for (var F in G) {
                H.style[F] = E[F]
            }
        },
        css: function(H, F, J, E) {
            if (F == "width" || F == "height") {
                var L, G = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    K = F == "width" ? ["Left", "Right"] : ["Top", "Bottom"];

                function I() {
                    L = F == "width" ? H.offsetWidth : H.offsetHeight;
                    if (E === "border") {
                        return
                    }
                    o.each(K, function() {
                        if (!E) {
                            L -= parseFloat(o.curCSS(H, "padding" + this, true)) || 0
                        }
                        if (E === "margin") {
                            L += parseFloat(o.curCSS(H, "margin" + this, true)) || 0
                        } else {
                            L -= parseFloat(o.curCSS(H, "border" + this + "Width", true)) || 0
                        }
                    })
                }
                if (H.offsetWidth !== 0) {
                    I()
                } else {
                    o.swap(H, G, I)
                }
                return Math.max(0, Math.round(L))
            }
            return o.curCSS(H, F, J)
        },
        curCSS: function(I, F, G) {
            var L, E = I.style;
            if (F == "opacity" && !o.support.opacity) {
                L = o.attr(E, "opacity");
                return L == "" ? "1" : L
            }
            if (F.match(/float/i)) {
                F = w
            }
            if (!G && E && E[F]) {
                L = E[F]
            } else {
                if (q.getComputedStyle) {
                    if (F.match(/float/i)) {
                        F = "float"
                    }
                    F = F.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var M = q.getComputedStyle(I, null);
                    if (M) {
                        L = M.getPropertyValue(F)
                    }
                    if (F == "opacity" && L == "") {
                        L = "1"
                    }
                } else {
                    if (I.currentStyle) {
                        var J = F.replace(/\-(\w)/g, function(N, O) {
                            return O.toUpperCase()
                        });
                        L = I.currentStyle[F] || I.currentStyle[J];
                        if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
                            var H = E.left,
                                K = I.runtimeStyle.left;
                            I.runtimeStyle.left = I.currentStyle.left;
                            E.left = L || 0;
                            L = E.pixelLeft + "px";
                            E.left = H;
                            I.runtimeStyle.left = K
                        }
                    }
                }
            }
            return L
        },
        clean: function(F, K, I) {
            K = K || document;
            if (typeof K.createElement === "undefined") {
                K = K.ownerDocument || K[0] && K[0].ownerDocument || document
            }
            if (!I && F.length === 1 && typeof F[0] === "string") {
                var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
                if (H) {
                    return [K.createElement(H[1])]
                }
            }
            var G = [],
                E = [],
                L = K.createElement("div");
            o.each(F, function(P, S) {
                if (typeof S === "number") {
                    S += ""
                }
                if (!S) {
                    return
                }
                if (typeof S === "string") {
                    S = S.replace(/(<(\w+)[^>]*?)\/>/g, function(U, V, T) {
                        return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U : V + "></" + T + ">"
                    });
                    var O = S.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var Q = !O.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !O.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || O.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !O.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!O.indexOf("<td") || !O.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !O.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !o.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    L.innerHTML = Q[1] + S + Q[2];
                    while (Q[0]--) {
                        L = L.lastChild
                    }
                    if (!o.support.tbody) {
                        var R = /<tbody/i.test(S),
                            N = !O.indexOf("<table") && !R ? L.firstChild && L.firstChild.childNodes : Q[1] == "<table>" && !R ? L.childNodes : [];
                        for (var M = N.length - 1; M >= 0; --M) {
                            if (o.nodeName(N[M], "tbody") && !N[M].childNodes.length) {
                                N[M].parentNode.removeChild(N[M])
                            }
                        }
                    }
                    if (!o.support.leadingWhitespace && /^\s/.test(S)) {
                        L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]), L.firstChild)
                    }
                    S = o.makeArray(L.childNodes)
                }
                if (S.nodeType) {
                    G.push(S)
                } else {
                    G = o.merge(G, S)
                }
            });
            if (I) {
                for (var J = 0; G[J]; J++) {
                    if (o.nodeName(G[J], "script") && (!G[J].type || G[J].type.toLowerCase() === "text/javascript")) {
                        E.push(G[J].parentNode ? G[J].parentNode.removeChild(G[J]) : G[J])
                    } else {
                        if (G[J].nodeType === 1) {
                            G.splice.apply(G, [J + 1, 0].concat(o.makeArray(G[J].getElementsByTagName("script"))))
                        }
                        I.appendChild(G[J])
                    }
                }
                return E
            }
            return G
        },
        attr: function(J, G, K) {
            if (!J || J.nodeType == 3 || J.nodeType == 8) {
                return g
            }
            var H = !o.isXMLDoc(J),
                L = K !== g;
            G = H && o.props[G] || G;
            if (J.tagName) {
                var F = /href|src|style/.test(G);
                if (G == "selected" && J.parentNode) {
                    J.parentNode.selectedIndex
                }
                if (G in J && H && !F) {
                    if (L) {
                        if (G == "type" && o.nodeName(J, "input") && J.parentNode) {
                            throw "type property can't be changed"
                        }
                        J[G] = K
                    }
                    if (o.nodeName(J, "form") && J.getAttributeNode(G)) {
                        return J.getAttributeNode(G).nodeValue
                    }
                    if (G == "tabIndex") {
                        var I = J.getAttributeNode("tabIndex");
                        return I && I.specified ? I.value : J.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : J.nodeName.match(/^(a|area)$/i) && J.href ? 0 : g
                    }
                    return J[G]
                }
                if (!o.support.style && H && G == "style") {
                    return o.attr(J.style, "cssText", K)
                }
                if (L) {
                    J.setAttribute(G, "" + K)
                }
                var E = !o.support.hrefNormalized && H && F ? J.getAttribute(G, 2) : J.getAttribute(G);
                return E === null ? g : E
            }
            if (!o.support.opacity && G == "opacity") {
                if (L) {
                    J.zoom = 1;
                    J.filter = (J.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(K) + "" == "NaN" ? "" : "alpha(opacity=" + K * 100 + ")")
                }
                return J.filter && J.filter.indexOf("opacity=") >= 0 ? (parseFloat(J.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : ""
            }
            G = G.replace(/-([a-z])/ig, function(M, N) {
                return N.toUpperCase()
            });
            if (L) {
                J[G] = K
            }
            return J[G]
        },
        trim: function(E) {
            return (E || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(G) {
            var E = [];
            if (G != null) {
                var F = G.length;
                if (F == null || typeof G === "string" || o.isFunction(G) || G.setInterval) {
                    E[0] = G
                } else {
                    while (F) {
                        E[--F] = G[F]
                    }
                }
            }
            return E
        },
        inArray: function(G, H) {
            for (var E = 0, F = H.length; E < F; E++) {
                if (H[E] === G) {
                    return E
                }
            }
            return -1
        },
        merge: function(H, E) {
            var F = 0,
                G, I = H.length;
            if (!o.support.getAll) {
                while ((G = E[F++]) != null) {
                    if (G.nodeType != 8) {
                        H[I++] = G
                    }
                }
            } else {
                while ((G = E[F++]) != null) {
                    H[I++] = G
                }
            }
            return H
        },
        unique: function(K) {
            var F = [],
                E = {};
            try {
                for (var G = 0, H = K.length; G < H; G++) {
                    var J = o.data(K[G]);
                    if (!E[J]) {
                        E[J] = true;
                        F.push(K[G])
                    }
                }
            } catch (I) {
                F = K
            }
            return F
        },
        grep: function(F, J, E) {
            var G = [];
            for (var H = 0, I = F.length; H < I; H++) {
                if (!E != !J(F[H], H)) {
                    G.push(F[H])
                }
            }
            return G
        },
        map: function(E, J) {
            var F = [];
            for (var G = 0, H = E.length; G < H; G++) {
                var I = J(E[G], G);
                if (I != null) {
                    F[F.length] = I
                }
            }
            return F.concat.apply([], F)
        }
    });
    var C = navigator.userAgent.toLowerCase();
    o.browser = {
        version: (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(C),
        opera: /opera/.test(C),
        msie: /msie/.test(C) && !/opera/.test(C),
        mozilla: /mozilla/.test(C) && !/(compatible|webkit)/.test(C)
    };
    o.each({
        parent: function(E) {
            return E.parentNode
        },
        parents: function(E) {
            return o.dir(E, "parentNode")
        },
        next: function(E) {
            return o.nth(E, 2, "nextSibling")
        },
        prev: function(E) {
            return o.nth(E, 2, "previousSibling")
        },
        nextAll: function(E) {
            return o.dir(E, "nextSibling")
        },
        prevAll: function(E) {
            return o.dir(E, "previousSibling")
        },
        siblings: function(E) {
            return o.sibling(E.parentNode.firstChild, E)
        },
        children: function(E) {
            return o.sibling(E.firstChild)
        },
        contents: function(E) {
            return o.nodeName(E, "iframe") ? E.contentDocument || E.contentWindow.document : o.makeArray(E.childNodes)
        }
    }, function(E, F) {
        o.fn[E] = function(G) {
            var H = o.map(this, F);
            if (G && typeof G == "string") {
                H = o.multiFilter(G, H)
            }
            return this.pushStack(o.unique(H), E, G)
        }
    });
    o.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(E, F) {
        o.fn[E] = function(G) {
            var J = [],
                L = o(G);
            for (var K = 0, H = L.length; K < H; K++) {
                var I = (K > 0 ? this.clone(true) : this).get();
                o.fn[F].apply(o(L[K]), I);
                J = J.concat(I)
            }
            return this.pushStack(J, E, G)
        }
    });
    o.each({
        removeAttr: function(E) {
            o.attr(this, E, "");
            if (this.nodeType == 1) {
                this.removeAttribute(E)
            }
        },
        addClass: function(E) {
            o.className.add(this, E)
        },
        removeClass: function(E) {
            o.className.remove(this, E)
        },
        toggleClass: function(F, E) {
            if (typeof E !== "boolean") {
                E = !o.className.has(this, F)
            }
            o.className[E ? "add" : "remove"](this, F)
        },
        remove: function(E) {
            if (!E || o.filter(E, [this]).length) {
                o("*", this).add([this]).each(function() {
                    o.event.remove(this);
                    o.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        },
        empty: function() {
            o(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    }, function(E, F) {
        o.fn[E] = function() {
            return this.each(F, arguments)
        }
    });

    function j(E, F) {
        return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0
    }
    var h = "jQuery" + e(),
        v = 0,
        A = {};
    o.extend({
        cache: {},
        data: function(F, E, G) {
            F = F == l ? A : F;
            var H = F[h];
            if (!H) {
                H = F[h] = ++v
            }
            if (E && !o.cache[H]) {
                o.cache[H] = {}
            }
            if (G !== g) {
                o.cache[H][E] = G
            }
            return E ? o.cache[H][E] : H
        },
        removeData: function(F, E) {
            F = F == l ? A : F;
            var H = F[h];
            if (E) {
                if (o.cache[H]) {
                    delete o.cache[H][E];
                    E = "";
                    for (E in o.cache[H]) {
                        break
                    }
                    if (!E) {
                        o.removeData(F)
                    }
                }
            } else {
                try {
                    delete F[h]
                } catch (G) {
                    if (F.removeAttribute) {
                        F.removeAttribute(h)
                    }
                }
                delete o.cache[H]
            }
        },
        queue: function(F, E, H) {
            if (F) {
                E = (E || "fx") + "queue";
                var G = o.data(F, E);
                if (!G || o.isArray(H)) {
                    G = o.data(F, E, o.makeArray(H))
                } else {
                    if (H) {
                        G.push(H)
                    }
                }
            }
            return G
        },
        dequeue: function(H, G) {
            var E = o.queue(H, G),
                F = E.shift();
            if (!G || G === "fx") {
                F = E[0]
            }
            if (F !== g) {
                F.call(H)
            }
        }
    });
    o.fn.extend({
        data: function(E, G) {
            var H = E.split(".");
            H[1] = H[1] ? "." + H[1] : "";
            if (G === g) {
                var F = this.triggerHandler("getData" + H[1] + "!", [H[0]]);
                if (F === g && this.length) {
                    F = o.data(this[0], E)
                }
                return F === g && H[1] ? this.data(H[0]) : F
            } else {
                return this.trigger("setData" + H[1] + "!", [H[0], G]).each(function() {
                    o.data(this, E, G)
                })
            }
        },
        removeData: function(E) {
            return this.each(function() {
                o.removeData(this, E)
            })
        },
        queue: function(E, F) {
            if (typeof E !== "string") {
                F = E;
                E = "fx"
            }
            if (F === g) {
                return o.queue(this[0], E)
            }
            return this.each(function() {
                var G = o.queue(this, E, F);
                if (E == "fx" && G.length == 1) {
                    G[0].call(this)
                }
            })
        },
        dequeue: function(E) {
            return this.each(function() {
                o.dequeue(this, E)
            })
        }
    });
    (function() {
        var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
            L = 0,
            H = Object.prototype.toString;
        var F = function(Y, U, ab, ac) {
            ab = ab || [];
            U = U || document;
            if (U.nodeType !== 1 && U.nodeType !== 9) {
                return []
            }
            if (!Y || typeof Y !== "string") {
                return ab
            }
            var Z = [],
                W, af, ai, T, ad, V, X = true;
            R.lastIndex = 0;
            while ((W = R.exec(Y)) !== null) {
                Z.push(W[1]);
                if (W[2]) {
                    V = RegExp.rightContext;
                    break
                }
            }
            if (Z.length > 1 && M.exec(Y)) {
                if (Z.length === 2 && I.relative[Z[0]]) {
                    af = J(Z[0] + Z[1], U)
                } else {
                    af = I.relative[Z[0]] ? [U] : F(Z.shift(), U);
                    while (Z.length) {
                        Y = Z.shift();
                        if (I.relative[Y]) {
                            Y += Z.shift()
                        }
                        af = J(Y, af)
                    }
                }
            } else {
                var ae = ac ? {
                    expr: Z.pop(),
                    set: E(ac)
                } : F.find(Z.pop(), Z.length === 1 && U.parentNode ? U.parentNode : U, Q(U));
                af = F.filter(ae.expr, ae.set);
                if (Z.length > 0) {
                    ai = E(af)
                } else {
                    X = false
                }
                while (Z.length) {
                    var ah = Z.pop(),
                        ag = ah;
                    if (!I.relative[ah]) {
                        ah = ""
                    } else {
                        ag = Z.pop()
                    }
                    if (ag == null) {
                        ag = U
                    }
                    I.relative[ah](ai, ag, Q(U))
                }
            }
            if (!ai) {
                ai = af
            }
            if (!ai) {
                throw "Syntax error, unrecognized expression: " + (ah || Y)
            }
            if (H.call(ai) === "[object Array]") {
                if (!X) {
                    ab.push.apply(ab, ai)
                } else {
                    if (U.nodeType === 1) {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && (ai[aa] === true || ai[aa].nodeType === 1 && K(U, ai[aa]))) {
                                ab.push(af[aa])
                            }
                        }
                    } else {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && ai[aa].nodeType === 1) {
                                ab.push(af[aa])
                            }
                        }
                    }
                }
            } else {
                E(ai, ab)
            }
            if (V) {
                F(V, U, ab, ac);
                if (G) {
                    hasDuplicate = false;
                    ab.sort(G);
                    if (hasDuplicate) {
                        for (var aa = 1; aa < ab.length; aa++) {
                            if (ab[aa] === ab[aa - 1]) {
                                ab.splice(aa--, 1)
                            }
                        }
                    }
                }
            }
            return ab
        };
        F.matches = function(T, U) {
            return F(T, null, null, U)
        };
        F.find = function(aa, T, ab) {
            var Z, X;
            if (!aa) {
                return []
            }
            for (var W = 0, V = I.order.length; W < V; W++) {
                var Y = I.order[W],
                    X;
                if ((X = I.match[Y].exec(aa))) {
                    var U = RegExp.leftContext;
                    if (U.substr(U.length - 1) !== "\\") {
                        X[1] = (X[1] || "").replace(/\\/g, "");
                        Z = I.find[Y](X, T, ab);
                        if (Z != null) {
                            aa = aa.replace(I.match[Y], "");
                            break
                        }
                    }
                }
            }
            if (!Z) {
                Z = T.getElementsByTagName("*")
            }
            return {
                set: Z,
                expr: aa
            }
        };
        F.filter = function(ad, ac, ag, W) {
            var V = ad,
                ai = [],
                aa = ac,
                Y, T, Z = ac && ac[0] && Q(ac[0]);
            while (ad && ac.length) {
                for (var ab in I.filter) {
                    if ((Y = I.match[ab].exec(ad)) != null) {
                        var U = I.filter[ab],
                            ah, af;
                        T = false;
                        if (aa == ai) {
                            ai = []
                        }
                        if (I.preFilter[ab]) {
                            Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
                            if (!Y) {
                                T = ah = true
                            } else {
                                if (Y === true) {
                                    continue
                                }
                            }
                        }
                        if (Y) {
                            for (var X = 0;
                                (af = aa[X]) != null; X++) {
                                if (af) {
                                    ah = U(af, Y, X, aa);
                                    var ae = W ^ !!ah;
                                    if (ag && ah != null) {
                                        if (ae) {
                                            T = true
                                        } else {
                                            aa[X] = false
                                        }
                                    } else {
                                        if (ae) {
                                            ai.push(af);
                                            T = true
                                        }
                                    }
                                }
                            }
                        }
                        if (ah !== g) {
                            if (!ag) {
                                aa = ai
                            }
                            ad = ad.replace(I.match[ab], "");
                            if (!T) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (ad == V) {
                    if (T == null) {
                        throw "Syntax error, unrecognized expression: " + ad
                    } else {
                        break
                    }
                }
                V = ad
            }
            return aa
        };
        var I = F.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(T) {
                    return T.getAttribute("href")
                }
            },
            relative: {
                "+": function(aa, T, Z) {
                    var X = typeof T === "string",
                        ab = X && !/\W/.test(T),
                        Y = X && !ab;
                    if (ab && !Z) {
                        T = T.toUpperCase()
                    }
                    for (var W = 0, V = aa.length, U; W < V; W++) {
                        if ((U = aa[W])) {
                            while ((U = U.previousSibling) && U.nodeType !== 1) {}
                            aa[W] = Y || U && U.nodeName === T ? U || false : U === T
                        }
                    }
                    if (Y) {
                        F.filter(T, aa, true)
                    }
                },
                ">": function(Z, U, aa) {
                    var X = typeof U === "string";
                    if (X && !/\W/.test(U)) {
                        U = aa ? U : U.toUpperCase();
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                var W = Y.parentNode;
                                Z[V] = W.nodeName === U ? W : false
                            }
                        }
                    } else {
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                Z[V] = X ? Y.parentNode : Y.parentNode === U
                            }
                        }
                        if (X) {
                            F.filter(U, Z, true)
                        }
                    }
                },
                "": function(W, U, Y) {
                    var V = L++,
                        T = S;
                    if (!U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P
                    }
                    T("parentNode", U, V, W, X, Y)
                },
                "~": function(W, U, Y) {
                    var V = L++,
                        T = S;
                    if (typeof U === "string" && !U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P
                    }
                    T("previousSibling", U, V, W, X, Y)
                }
            },
            find: {
                ID: function(U, V, W) {
                    if (typeof V.getElementById !== "undefined" && !W) {
                        var T = V.getElementById(U[1]);
                        return T ? [T] : []
                    }
                },
                NAME: function(V, Y, Z) {
                    if (typeof Y.getElementsByName !== "undefined") {
                        var U = [],
                            X = Y.getElementsByName(V[1]);
                        for (var W = 0, T = X.length; W < T; W++) {
                            if (X[W].getAttribute("name") === V[1]) {
                                U.push(X[W])
                            }
                        }
                        return U.length === 0 ? null : U
                    }
                },
                TAG: function(T, U) {
                    return U.getElementsByTagName(T[1])
                }
            },
            preFilter: {
                CLASS: function(W, U, V, T, Z, aa) {
                    W = " " + W[1].replace(/\\/g, "") + " ";
                    if (aa) {
                        return W
                    }
                    for (var X = 0, Y;
                        (Y = U[X]) != null; X++) {
                        if (Y) {
                            if (Z ^ (Y.className && (" " + Y.className + " ").indexOf(W) >= 0)) {
                                if (!V) {
                                    T.push(Y)
                                }
                            } else {
                                if (V) {
                                    U[X] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(T) {
                    return T[1].replace(/\\/g, "")
                },
                TAG: function(U, T) {
                    for (var V = 0; T[V] === false; V++) {}
                    return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase()
                },
                CHILD: function(T) {
                    if (T[1] == "nth") {
                        var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == "even" && "2n" || T[2] == "odd" && "2n+1" || !/\D/.test(T[2]) && "0n+" + T[2] || T[2]);
                        T[2] = (U[1] + (U[2] || 1)) - 0;
                        T[3] = U[3] - 0
                    }
                    T[0] = L++;
                    return T
                },
                ATTR: function(X, U, V, T, Y, Z) {
                    var W = X[1].replace(/\\/g, "");
                    if (!Z && I.attrMap[W]) {
                        X[1] = I.attrMap[W]
                    }
                    if (X[2] === "~=") {
                        X[4] = " " + X[4] + " "
                    }
                    return X
                },
                PSEUDO: function(X, U, V, T, Y) {
                    if (X[1] === "not") {
                        if (X[3].match(R).length > 1 || /^\w/.test(X[3])) {
                            X[3] = F(X[3], null, null, U)
                        } else {
                            var W = F.filter(X[3], U, V, true ^ Y);
                            if (!V) {
                                T.push.apply(T, W)
                            }
                            return false
                        }
                    } else {
                        if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
                            return true
                        }
                    }
                    return X
                },
                POS: function(T) {
                    T.unshift(true);
                    return T
                }
            },
            filters: {
                enabled: function(T) {
                    return T.disabled === false && T.type !== "hidden"
                },
                disabled: function(T) {
                    return T.disabled === true
                },
                checked: function(T) {
                    return T.checked === true
                },
                selected: function(T) {
                    T.parentNode.selectedIndex;
                    return T.selected === true
                },
                parent: function(T) {
                    return !!T.firstChild
                },
                empty: function(T) {
                    return !T.firstChild
                },
                has: function(V, U, T) {
                    return !!F(T[3], V).length
                },
                header: function(T) {
                    return /h\d/i.test(T.nodeName)
                },
                text: function(T) {
                    return "text" === T.type
                },
                radio: function(T) {
                    return "radio" === T.type
                },
                checkbox: function(T) {
                    return "checkbox" === T.type
                },
                file: function(T) {
                    return "file" === T.type
                },
                password: function(T) {
                    return "password" === T.type
                },
                submit: function(T) {
                    return "submit" === T.type
                },
                image: function(T) {
                    return "image" === T.type
                },
                reset: function(T) {
                    return "reset" === T.type
                },
                button: function(T) {
                    return "button" === T.type || T.nodeName.toUpperCase() === "BUTTON"
                },
                input: function(T) {
                    return /input|select|textarea|button/i.test(T.nodeName)
                }
            },
            setFilters: {
                first: function(U, T) {
                    return T === 0
                },
                last: function(V, U, T, W) {
                    return U === W.length - 1
                },
                even: function(U, T) {
                    return T % 2 === 0
                },
                odd: function(U, T) {
                    return T % 2 === 1
                },
                lt: function(V, U, T) {
                    return U < T[3] - 0
                },
                gt: function(V, U, T) {
                    return U > T[3] - 0
                },
                nth: function(V, U, T) {
                    return T[3] - 0 == U
                },
                eq: function(V, U, T) {
                    return T[3] - 0 == U
                }
            },
            filter: {
                PSEUDO: function(Z, V, W, aa) {
                    var U = V[1],
                        X = I.filters[U];
                    if (X) {
                        return X(Z, W, V, aa)
                    } else {
                        if (U === "contains") {
                            return (Z.textContent || Z.innerText || "").indexOf(V[3]) >= 0
                        } else {
                            if (U === "not") {
                                var Y = V[3];
                                for (var W = 0, T = Y.length; W < T; W++) {
                                    if (Y[W] === Z) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                },
                CHILD: function(T, W) {
                    var Z = W[1],
                        U = T;
                    switch (Z) {
                        case "only":
                        case "first":
                            while (U = U.previousSibling) {
                                if (U.nodeType === 1) {
                                    return false
                                }
                            }
                            if (Z == "first") {
                                return true
                            }
                            U = T;
                        case "last":
                            while (U = U.nextSibling) {
                                if (U.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case "nth":
                            var V = W[2],
                                ac = W[3];
                            if (V == 1 && ac == 0) {
                                return true
                            }
                            var Y = W[0],
                                ab = T.parentNode;
                            if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
                                var X = 0;
                                for (U = ab.firstChild; U; U = U.nextSibling) {
                                    if (U.nodeType === 1) {
                                        U.nodeIndex = ++X
                                    }
                                }
                                ab.sizcache = Y
                            }
                            var aa = T.nodeIndex - ac;
                            if (V == 0) {
                                return aa == 0
                            } else {
                                return (aa % V == 0 && aa / V >= 0)
                            }
                    }
                },
                ID: function(U, T) {
                    return U.nodeType === 1 && U.getAttribute("id") === T
                },
                TAG: function(U, T) {
                    return (T === "*" && U.nodeType === 1) || U.nodeName === T
                },
                CLASS: function(U, T) {
                    return (" " + (U.className || U.getAttribute("class")) + " ").indexOf(T) > -1
                },
                ATTR: function(Y, W) {
                    var V = W[1],
                        T = I.attrHandle[V] ? I.attrHandle[V](Y) : Y[V] != null ? Y[V] : Y.getAttribute(V),
                        Z = T + "",
                        X = W[2],
                        U = W[4];
                    return T == null ? X === "!=" : X === "=" ? Z === U : X === "*=" ? Z.indexOf(U) >= 0 : X === "~=" ? (" " + Z + " ").indexOf(U) >= 0 : !U ? Z && T !== false : X === "!=" ? Z != U : X === "^=" ? Z.indexOf(U) === 0 : X === "$=" ? Z.substr(Z.length - U.length) === U : X === "|=" ? Z === U || Z.substr(0, U.length + 1) === U + "-" : false
                },
                POS: function(X, U, V, Y) {
                    var T = U[2],
                        W = I.setFilters[T];
                    if (W) {
                        return W(X, V, U, Y)
                    }
                }
            }
        };
        var M = I.match.POS;
        for (var O in I.match) {
            I.match[O] = RegExp(I.match[O].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var E = function(U, T) {
            U = Array.prototype.slice.call(U);
            if (T) {
                T.push.apply(T, U);
                return T
            }
            return U
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (N) {
            E = function(X, W) {
                var U = W || [];
                if (H.call(X) === "[object Array]") {
                    Array.prototype.push.apply(U, X)
                } else {
                    if (typeof X.length === "number") {
                        for (var V = 0, T = X.length; V < T; V++) {
                            U.push(X[V])
                        }
                    } else {
                        for (var V = 0; X[V]; V++) {
                            U.push(X[V])
                        }
                    }
                }
                return U
            }
        }
        var G;
        if (document.documentElement.compareDocumentPosition) {
            G = function(U, T) {
                var V = U.compareDocumentPosition(T) & 4 ? -1 : U === T ? 0 : 1;
                if (V === 0) {
                    hasDuplicate = true
                }
                return V
            }
        } else {
            if ("sourceIndex" in document.documentElement) {
                G = function(U, T) {
                    var V = U.sourceIndex - T.sourceIndex;
                    if (V === 0) {
                        hasDuplicate = true
                    }
                    return V
                }
            } else {
                if (document.createRange) {
                    G = function(W, U) {
                        var V = W.ownerDocument.createRange(),
                            T = U.ownerDocument.createRange();
                        V.selectNode(W);
                        V.collapse(true);
                        T.selectNode(U);
                        T.collapse(true);
                        var X = V.compareBoundaryPoints(Range.START_TO_END, T);
                        if (X === 0) {
                            hasDuplicate = true
                        }
                        return X
                    }
                }
            }
        }(function() {
            var U = document.createElement("form"),
                V = "script" + (new Date).getTime();
            U.innerHTML = "<input name='" + V + "'/>";
            var T = document.documentElement;
            T.insertBefore(U, T.firstChild);
            if (!!document.getElementById(V)) {
                I.find.ID = function(X, Y, Z) {
                    if (typeof Y.getElementById !== "undefined" && !Z) {
                        var W = Y.getElementById(X[1]);
                        return W ? W.id === X[1] || typeof W.getAttributeNode !== "undefined" && W.getAttributeNode("id").nodeValue === X[1] ? [W] : g : []
                    }
                };
                I.filter.ID = function(Y, W) {
                    var X = typeof Y.getAttributeNode !== "undefined" && Y.getAttributeNode("id");
                    return Y.nodeType === 1 && X && X.nodeValue === W
                }
            }
            T.removeChild(U)
        })();
        (function() {
            var T = document.createElement("div");
            T.appendChild(document.createComment(""));
            if (T.getElementsByTagName("*").length > 0) {
                I.find.TAG = function(U, Y) {
                    var X = Y.getElementsByTagName(U[1]);
                    if (U[1] === "*") {
                        var W = [];
                        for (var V = 0; X[V]; V++) {
                            if (X[V].nodeType === 1) {
                                W.push(X[V])
                            }
                        }
                        X = W
                    }
                    return X
                }
            }
            T.innerHTML = "<a href='#'></a>";
            if (T.firstChild && typeof T.firstChild.getAttribute !== "undefined" && T.firstChild.getAttribute("href") !== "#") {
                I.attrHandle.href = function(U) {
                    return U.getAttribute("href", 2)
                }
            }
        })();
        if (document.querySelectorAll) {
            (function() {
                var T = F,
                    U = document.createElement("div");
                U.innerHTML = "<p class='TEST'></p>";
                if (U.querySelectorAll && U.querySelectorAll(".TEST").length === 0) {
                    return
                }
                F = function(Y, X, V, W) {
                    X = X || document;
                    if (!W && X.nodeType === 9 && !Q(X)) {
                        try {
                            return E(X.querySelectorAll(Y), V)
                        } catch (Z) {}
                    }
                    return T(Y, X, V, W)
                };
                F.find = T.find;
                F.filter = T.filter;
                F.selectors = T.selectors;
                F.matches = T.matches
            })()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function() {
                var T = document.createElement("div");
                T.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (T.getElementsByClassName("e").length === 0) {
                    return
                }
                T.lastChild.className = "e";
                if (T.getElementsByClassName("e").length === 1) {
                    return
                }
                I.order.splice(1, 0, "CLASS");
                I.find.CLASS = function(U, V, W) {
                    if (typeof V.getElementsByClassName !== "undefined" && !W) {
                        return V.getElementsByClassName(U[1])
                    }
                }
            })()
        }

        function P(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1 && !ac) {
                            T.sizcache = Y;
                            T.sizset = W
                        }
                        if (T.nodeName === Z) {
                            X = T;
                            break
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }

        function S(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1) {
                            if (!ac) {
                                T.sizcache = Y;
                                T.sizset = W
                            }
                            if (typeof Z !== "string") {
                                if (T === Z) {
                                    X = true;
                                    break
                                }
                            } else {
                                if (F.filter(Z, [T]).length > 0) {
                                    X = T;
                                    break
                                }
                            }
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }
        var K = document.compareDocumentPosition ? function(U, T) {
            return U.compareDocumentPosition(T) & 16
        } : function(U, T) {
            return U !== T && (U.contains ? U.contains(T) : true)
        };
        var Q = function(T) {
            return T.nodeType === 9 && T.documentElement.nodeName !== "HTML" || !!T.ownerDocument && Q(T.ownerDocument)
        };
        var J = function(T, aa) {
            var W = [],
                X = "",
                Y, V = aa.nodeType ? [aa] : aa;
            while ((Y = I.match.PSEUDO.exec(T))) {
                X += Y[0];
                T = T.replace(I.match.PSEUDO, "")
            }
            T = I.relative[T] ? T + "*" : T;
            for (var Z = 0, U = V.length; Z < U; Z++) {
                F(T, V[Z], W)
            }
            return F.filter(X, W)
        };
        o.find = F;
        o.filter = F.filter;
        o.expr = F.selectors;
        o.expr[":"] = o.expr.filters;
        F.selectors.filters.hidden = function(T) {
            return T.offsetWidth === 0 || T.offsetHeight === 0
        };
        F.selectors.filters.visible = function(T) {
            return T.offsetWidth > 0 || T.offsetHeight > 0
        };
        F.selectors.filters.animated = function(T) {
            return o.grep(o.timers, function(U) {
                return T === U.elem
            }).length
        };
        o.multiFilter = function(V, T, U) {
            if (U) {
                V = ":not(" + V + ")"
            }
            return F.matches(V, T)
        };
        o.dir = function(V, U) {
            var T = [],
                W = V[U];
            while (W && W != document) {
                if (W.nodeType == 1) {
                    T.push(W)
                }
                W = W[U]
            }
            return T
        };
        o.nth = function(X, T, V, W) {
            T = T || 1;
            var U = 0;
            for (; X; X = X[V]) {
                if (X.nodeType == 1 && ++U == T) {
                    break
                }
            }
            return X
        };
        o.sibling = function(V, U) {
            var T = [];
            for (; V; V = V.nextSibling) {
                if (V.nodeType == 1 && V != U) {
                    T.push(V)
                }
            }
            return T
        };
        return;
        l.Sizzle = F
    })();
    o.event = {
        add: function(I, F, H, K) {
            if (I.nodeType == 3 || I.nodeType == 8) {
                return
            }
            if (I.setInterval && I != l) {
                I = l
            }
            if (!H.guid) {
                H.guid = this.guid++
            }
            if (K !== g) {
                var G = H;
                H = this.proxy(G);
                H.data = K
            }
            var E = o.data(I, "events") || o.data(I, "events", {}),
                J = o.data(I, "handle") || o.data(I, "handle", function() {
                    return typeof o !== "undefined" && !o.event.triggered ? o.event.handle.apply(arguments.callee.elem, arguments) : g
                });
            J.elem = I;
            o.each(F.split(/\s+/), function(M, N) {
                var O = N.split(".");
                N = O.shift();
                H.type = O.slice().sort().join(".");
                var L = E[N];
                if (o.event.specialAll[N]) {
                    o.event.specialAll[N].setup.call(I, K, O)
                }
                if (!L) {
                    L = E[N] = {};
                    if (!o.event.special[N] || o.event.special[N].setup.call(I, K, O) === false) {
                        if (I.addEventListener) {
                            I.addEventListener(N, J, false)
                        } else {
                            if (I.attachEvent) {
                                I.attachEvent("on" + N, J)
                            }
                        }
                    }
                }
                L[H.guid] = H;
                o.event.global[N] = true
            });
            I = null
        },
        guid: 1,
        global: {},
        remove: function(K, H, J) {
            if (K.nodeType == 3 || K.nodeType == 8) {
                return
            }
            var G = o.data(K, "events"),
                F, E;
            if (G) {
                if (H === g || (typeof H === "string" && H.charAt(0) == ".")) {
                    for (var I in G) {
                        this.remove(K, I + (H || ""))
                    }
                } else {
                    if (H.type) {
                        J = H.handler;
                        H = H.type
                    }
                    o.each(H.split(/\s+/), function(M, O) {
                        var Q = O.split(".");
                        O = Q.shift();
                        var N = RegExp("(^|\\.)" + Q.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (G[O]) {
                            if (J) {
                                delete G[O][J.guid]
                            } else {
                                for (var P in G[O]) {
                                    if (N.test(G[O][P].type)) {
                                        delete G[O][P]
                                    }
                                }
                            }
                            if (o.event.specialAll[O]) {
                                o.event.specialAll[O].teardown.call(K, Q)
                            }
                            for (F in G[O]) {
                                break
                            }
                            if (!F) {
                                if (!o.event.special[O] || o.event.special[O].teardown.call(K, Q) === false) {
                                    if (K.removeEventListener) {
                                        K.removeEventListener(O, o.data(K, "handle"), false)
                                    } else {
                                        if (K.detachEvent) {
                                            K.detachEvent("on" + O, o.data(K, "handle"))
                                        }
                                    }
                                }
                                F = null;
                                delete G[O]
                            }
                        }
                    })
                }
                for (F in G) {
                    break
                }
                if (!F) {
                    var L = o.data(K, "handle");
                    if (L) {
                        L.elem = null
                    }
                    o.removeData(K, "events");
                    o.removeData(K, "handle")
                }
            }
        },
        trigger: function(I, K, H, E) {
            var G = I.type || I;
            if (!E) {
                I = typeof I === "object" ? I[h] ? I : o.extend(o.Event(G), I) : o.Event(G);
                if (G.indexOf("!") >= 0) {
                    I.type = G = G.slice(0, -1);
                    I.exclusive = true
                }
                if (!H) {
                    I.stopPropagation();
                    if (this.global[G]) {
                        o.each(o.cache, function() {
                            if (this.events && this.events[G]) {
                                o.event.trigger(I, K, this.handle.elem)
                            }
                        })
                    }
                }
                if (!H || H.nodeType == 3 || H.nodeType == 8) {
                    return g
                }
                I.result = g;
                I.target = H;
                K = o.makeArray(K);
                K.unshift(I)
            }
            I.currentTarget = H;
            var J = o.data(H, "handle");
            if (J) {
                J.apply(H, K)
            }
            if ((!H[G] || (o.nodeName(H, "a") && G == "click")) && H["on" + G] && H["on" + G].apply(H, K) === false) {
                I.result = false
            }
            if (!E && H[G] && !I.isDefaultPrevented() && !(o.nodeName(H, "a") && G == "click")) {
                this.triggered = true;
                try {
                    H[G]()
                } catch (L) {}
            }
            this.triggered = false;
            if (!I.isPropagationStopped()) {
                var F = H.parentNode || H.ownerDocument;
                if (F) {
                    o.event.trigger(I, K, F, true)
                }
            }
        },
        handle: function(K) {
            var J, E;
            K = arguments[0] = o.event.fix(K || l.event);
            K.currentTarget = this;
            var L = K.type.split(".");
            K.type = L.shift();
            J = !L.length && !K.exclusive;
            var I = RegExp("(^|\\.)" + L.slice().sort().join(".*\\.") + "(\\.|$)");
            E = (o.data(this, "events") || {})[K.type];
            for (var G in E) {
                var H = E[G];
                if (J || I.test(H.type)) {
                    K.handler = H;
                    K.data = H.data;
                    var F = H.apply(this, arguments);
                    if (F !== g) {
                        K.result = F;
                        if (F === false) {
                            K.preventDefault();
                            K.stopPropagation()
                        }
                    }
                    if (K.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(H) {
            if (H[h]) {
                return H
            }
            var F = H;
            H = o.Event(F);
            for (var G = this.props.length, J; G;) {
                J = this.props[--G];
                H[J] = F[J]
            }
            if (!H.target) {
                H.target = H.srcElement || document
            }
            if (H.target.nodeType == 3) {
                H.target = H.target.parentNode
            }
            if (!H.relatedTarget && H.fromElement) {
                H.relatedTarget = H.fromElement == H.target ? H.toElement : H.fromElement
            }
            if (H.pageX == null && H.clientX != null) {
                var I = document.documentElement,
                    E = document.body;
                H.pageX = H.clientX + (I && I.scrollLeft || E && E.scrollLeft || 0) - (I.clientLeft || 0);
                H.pageY = H.clientY + (I && I.scrollTop || E && E.scrollTop || 0) - (I.clientTop || 0)
            }
            if (!H.which && ((H.charCode || H.charCode === 0) ? H.charCode : H.keyCode)) {
                H.which = H.charCode || H.keyCode
            }
            if (!H.metaKey && H.ctrlKey) {
                H.metaKey = H.ctrlKey
            }
            if (!H.which && H.button) {
                H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3 : (H.button & 4 ? 2 : 0)))
            }
            return H
        },
        proxy: function(F, E) {
            E = E || function() {
                return F.apply(this, arguments)
            };
            E.guid = F.guid = F.guid || E.guid || this.guid++;
            return E
        },
        special: {
            ready: {
                setup: B,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(E, F) {
                    o.event.add(this, F[0], c)
                },
                teardown: function(G) {
                    if (G.length) {
                        var E = 0,
                            F = RegExp("(^|\\.)" + G[0] + "(\\.|$)");
                        o.each((o.data(this, "events").live || {}), function() {
                            if (F.test(this.type)) {
                                E++
                            }
                        });
                        if (E < 1) {
                            o.event.remove(this, G[0], c)
                        }
                    }
                }
            }
        }
    };
    o.Event = function(E) {
        if (!this.preventDefault) {
            return new o.Event(E)
        }
        if (E && E.type) {
            this.originalEvent = E;
            this.type = E.type
        } else {
            this.type = E
        }
        this.timeStamp = e();
        this[h] = true
    };

    function k() {
        return false
    }

    function u() {
        return true
    }
    o.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.preventDefault) {
                E.preventDefault()
            }
            E.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.stopPropagation) {
                E.stopPropagation()
            }
            E.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u;
            this.stopPropagation()
        },
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k
    };
    var a = function(F) {
        var E = F.relatedTarget;
        while (E && E != this) {
            try {
                E = E.parentNode
            } catch (G) {
                E = this
            }
        }
        if (E != this) {
            F.type = F.data;
            o.event.handle.apply(this, arguments)
        }
    };
    o.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    }, function(F, E) {
        o.event.special[E] = {
            setup: function() {
                o.event.add(this, F, a, E)
            },
            teardown: function() {
                o.event.remove(this, F, a)
            }
        }
    });
    o.fn.extend({
        bind: function(F, G, E) {
            return F == "unload" ? this.one(F, G, E) : this.each(function() {
                o.event.add(this, F, E || G, E && G)
            })
        },
        one: function(G, H, F) {
            var E = o.event.proxy(F || H, function(I) {
                o(this).unbind(I, E);
                return (F || H).apply(this, arguments)
            });
            return this.each(function() {
                o.event.add(this, G, E, F && H)
            })
        },
        unbind: function(F, E) {
            return this.each(function() {
                o.event.remove(this, F, E)
            })
        },
        trigger: function(E, F) {
            return this.each(function() {
                o.event.trigger(E, F, this)
            })
        },
        triggerHandler: function(E, G) {
            if (this[0]) {
                var F = o.Event(E);
                F.preventDefault();
                F.stopPropagation();
                o.event.trigger(F, G, this[0]);
                return F.result
            }
        },
        toggle: function(G) {
            var E = arguments,
                F = 1;
            while (F < E.length) {
                o.event.proxy(G, E[F++])
            }
            return this.click(o.event.proxy(G, function(H) {
                this.lastToggle = (this.lastToggle || 0) % F;
                H.preventDefault();
                return E[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(E, F) {
            return this.mouseenter(E).mouseleave(F)
        },
        ready: function(E) {
            B();
            if (o.isReady) {
                E.call(document, o)
            } else {
                o.readyList.push(E)
            }
            return this
        },
        live: function(G, F) {
            var E = o.event.proxy(F);
            E.guid += this.selector + G;
            o(document).bind(i(G, this.selector), this.selector, E);
            return this
        },
        die: function(F, E) {
            o(document).unbind(i(F, this.selector), E ? {
                guid: E.guid + this.selector + F
            } : null);
            return this
        }
    });

    function c(H) {
        var E = RegExp("(^|\\.)" + H.type + "(\\.|$)"),
            G = true,
            F = [];
        o.each(o.data(this, "events").live || [], function(I, J) {
            if (E.test(J.type)) {
                var K = o(H.target).closest(J.data)[0];
                if (K) {
                    F.push({
                        elem: K,
                        fn: J
                    })
                }
            }
        });
        F.sort(function(J, I) {
            return o.data(J.elem, "closest") - o.data(I.elem, "closest")
        });
        o.each(F, function() {
            if (this.fn.call(this.elem, H, this.fn.data) === false) {
                return (G = false)
            }
        });
        return G
    }

    function i(F, E) {
        return ["live", F, E.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    o.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!o.isReady) {
                o.isReady = true;
                if (o.readyList) {
                    o.each(o.readyList, function() {
                        this.call(document, o)
                    });
                    o.readyList = null
                }
                o(document).triggerHandler("ready")
            }
        }
    });
    var x = false;

    function B() {
        if (x) {
            return
        }
        x = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                o.ready()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        o.ready()
                    }
                });
                if (document.documentElement.doScroll && l == l.top) {
                    (function() {
                        if (o.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch (E) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        o.ready()
                    })()
                }
            }
        }
        o.event.add(l, "load", o.ready)
    }
    o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","), function(F, E) {
        o.fn[E] = function(G) {
            return G ? this.bind(E, G) : this.trigger(E)
        }
    });
    o(l).bind("unload", function() {
        for (var E in o.cache) {
            if (E != 1 && o.cache[E].handle) {
                o.event.remove(o.cache[E].handle.elem)
            }
        }
    });
    (function() {
        o.support = {};
        var F = document.documentElement,
            G = document.createElement("script"),
            K = document.createElement("div"),
            J = "script" + (new Date).getTime();
        K.style.display = "none";
        K.innerHTML = '   <link/><table></table><a role="button" aria-label="a" href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var H = K.getElementsByTagName("*"),
            E = K.getElementsByTagName("a")[0];
        if (!H || !H.length || !E) {
            return
        }
        o.support = {
            leadingWhitespace: K.firstChild.nodeType == 3,
            tbody: !K.getElementsByTagName("tbody").length,
            objectAll: !!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!K.getElementsByTagName("link").length,
            style: /red/.test(E.getAttribute("style")),
            hrefNormalized: E.getAttribute("href") === "/a",
            opacity: E.style.opacity === "0.5",
            cssFloat: !!E.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        G.type = "text/javascript";
        try {
            G.appendChild(document.createTextNode("window." + J + "=1;"))
        } catch (I) {}
        F.insertBefore(G, F.firstChild);
        if (l[J]) {
            o.support.scriptEval = true;
            delete l[J]
        }
        F.removeChild(G);
        if (K.attachEvent && K.fireEvent) {
            K.attachEvent("onclick", function() {
                o.support.noCloneEvent = false;
                K.detachEvent("onclick", arguments.callee)
            });
            K.cloneNode(true).fireEvent("onclick")
        }
        o(function() {
            var L = document.createElement("div");
            L.style.width = L.style.paddingLeft = "1px";
            document.body.appendChild(L);
            o.boxModel = o.support.boxModel = L.offsetWidth === 2;
            document.body.removeChild(L).style.display = "none"
        })
    })();
    var w = o.support.cssFloat ? "cssFloat" : "styleFloat";
    o.props = {
        "for": "htmlFor",
        "class": "className",
        "float": w,
        cssFloat: w,
        styleFloat: w,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    o.fn.extend({
        _load: o.fn.load,
        load: function(G, J, K) {
            if (typeof G !== "string") {
                return this._load(G)
            }
            var I = G.indexOf(" ");
            if (I >= 0) {
                var E = G.slice(I, G.length);
                G = G.slice(0, I)
            }
            var H = "GET";
            if (J) {
                if (o.isFunction(J)) {
                    K = J;
                    J = null
                } else {
                    if (typeof J === "object") {
                        J = o.param(J);
                        H = "POST"
                    }
                }
            }
            var F = this;
            o.ajax({
                url: G,
                type: H,
                dataType: "html",
                data: J,
                complete: function(M, L) {
                    if (L == "success" || L == "notmodified") {
                        F.html(E ? o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(E) : M.responseText)
                    }
                    if (K) {
                        F.each(K, [M.responseText, L, M])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return o.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? o.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function(E, F) {
                var G = o(this).val();
                return G == null ? null : o.isArray(G) ? o.map(G, function(I, H) {
                    return {
                        name: F.name,
                        value: I
                    }
                }) : {
                    name: F.name,
                    value: G
                }
            }).get()
        }
    });
    o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(E, F) {
        o.fn[F] = function(G) {
            return this.bind(F, G)
        }
    });
    var r = e();
    o.extend({
        get: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = null
            }
            return o.ajax({
                type: "GET",
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        getScript: function(E, F) {
            return o.get(E, null, F, "script")
        },
        getJSON: function(E, F, G) {
            return o.get(E, F, G, "json")
        },
        post: function(E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = {}
            }
            return o.ajax({
                type: "POST",
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        ajaxSetup: function(E) {
            o.extend(o.ajaxSettings, E)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return l.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(M) {
            M = o.extend(true, M, o.extend(true, {}, o.ajaxSettings, M));
            var W, F = /=\?(&|$)/g,
                R, V, G = M.type.toUpperCase();
            if (M.data && M.processData && typeof M.data !== "string") {
                M.data = o.param(M.data)
            }
            if (M.dataType == "jsonp") {
                if (G == "GET") {
                    if (!M.url.match(F)) {
                        M.url += (M.url.match(/\?/) ? "&" : "?") + (M.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!M.data || !M.data.match(F)) {
                        M.data = (M.data ? M.data + "&" : "") + (M.jsonp || "callback") + "=?"
                    }
                }
                M.dataType = "json"
            }
            if (M.dataType == "json" && (M.data && M.data.match(F) || M.url.match(F))) {
                W = "jsonp" + r++;
                if (M.data) {
                    M.data = (M.data + "").replace(F, "=" + W + "$1")
                }
                M.url = M.url.replace(F, "=" + W + "$1");
                M.dataType = "script";
                l[W] = function(X) {
                    V = X;
                    I();
                    L();
                    l[W] = g;
                    try {
                        delete l[W]
                    } catch (Y) {}
                    if (H) {
                        H.removeChild(T)
                    }
                }
            }
            if (M.dataType == "script" && M.cache == null) {
                M.cache = false
            }
            if (M.cache === false && G == "GET") {
                var E = e();
                var U = M.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + E + "$2");
                M.url = U + ((U == M.url) ? (M.url.match(/\?/) ? "&" : "?") + "_=" + E : "")
            }
            if (M.data && G == "GET") {
                M.url += (M.url.match(/\?/) ? "&" : "?") + M.data;
                M.data = null
            }
            if (M.global && !o.active++) {
                o.event.trigger("ajaxStart")
            }
            var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
            if (M.dataType == "script" && G == "GET" && Q && (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
                var H = document.getElementsByTagName("head")[0];
                var T = document.createElement("script");
                T.src = M.url;
                if (M.scriptCharset) {
                    T.charset = M.scriptCharset
                }
                if (!W) {
                    var O = false;
                    T.onload = T.onreadystatechange = function() {
                        if (!O && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            O = true;
                            I();
                            L();
                            T.onload = T.onreadystatechange = null;
                            H.removeChild(T)
                        }
                    }
                }
                H.appendChild(T);
                return g
            }
            var K = false;
            var J = M.xhr();
            if (M.username) {
                J.open(G, M.url, M.async, M.username, M.password)
            } else {
                J.open(G, M.url, M.async)
            }
            try {
                if (M.data) {
                    J.setRequestHeader("Content-Type", M.contentType)
                }
                if (M.ifModified) {
                    J.setRequestHeader("If-Modified-Since", o.lastModified[M.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                }
                J.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                J.setRequestHeader("Accept", M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType] + ", */*" : M.accepts._default)
            } catch (S) {}
            if (M.beforeSend && M.beforeSend(J, M) === false) {
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop")
                }
                J.abort();
                return false
            }
            if (M.global) {
                o.event.trigger("ajaxSend", [J, M])
            }
            var N = function(X) {
                if (J.readyState == 0) {
                    if (P) {
                        clearInterval(P);
                        P = null;
                        if (M.global && !--o.active) {
                            o.event.trigger("ajaxStop")
                        }
                    }
                } else {
                    if (!K && J && (J.readyState == 4 || X == "timeout")) {
                        K = true;
                        if (P) {
                            clearInterval(P);
                            P = null
                        }
                        R = X == "timeout" ? "timeout" : !o.httpSuccess(J) ? "error" : M.ifModified && o.httpNotModified(J, M.url) ? "notmodified" : "success";
                        if (R == "success") {
                            try {
                                V = o.httpData(J, M.dataType, M)
                            } catch (Z) {
                                R = "parsererror"
                            }
                        }
                        if (R == "success") {
                            var Y;
                            try {
                                Y = J.getResponseHeader("Last-Modified")
                            } catch (Z) {}
                            if (M.ifModified && Y) {
                                o.lastModified[M.url] = Y
                            }
                            if (!W) {
                                I()
                            }
                        } else {
                            o.handleError(M, J, R)
                        }
                        L();
                        if (X) {
                            J.abort()
                        }
                        if (M.async) {
                            J = null
                        }
                    }
                }
            };
            if (M.async) {
                var P = setInterval(N, 13);
                if (M.timeout > 0) {
                    setTimeout(function() {
                        if (J && !K) {
                            N("timeout")
                        }
                    }, M.timeout)
                }
            }
            try {
                J.send(M.data)
            } catch (S) {
                o.handleError(M, J, null, S)
            }
            if (!M.async) {
                N()
            }

            function I() {
                if (M.success) {
                    M.success(V, R)
                }
                if (M.global) {
                    o.event.trigger("ajaxSuccess", [J, M])
                }
            }

            function L() {
                if (M.complete) {
                    M.complete(J, R)
                }
                if (M.global) {
                    o.event.trigger("ajaxComplete", [J, M])
                }
                if (M.global && !--o.active) {
                    o.event.trigger("ajaxStop")
                }
            }
            return J
        },
        handleError: function(F, H, E, G) {
            if (F.error) {
                F.error(H, E, G)
            }
            if (F.global) {
                o.event.trigger("ajaxError", [H, F, G])
            }
        },
        active: 0,
        httpSuccess: function(F) {
            try {
                return !F.status && location.protocol == "file:" || (F.status >= 200 && F.status < 300) || F.status == 304 || F.status == 1223
            } catch (E) {}
            return false
        },
        httpNotModified: function(G, E) {
            try {
                var H = G.getResponseHeader("Last-Modified");
                return G.status == 304 || H == o.lastModified[E]
            } catch (F) {}
            return false
        },
        httpData: function(J, H, G) {
            var F = J.getResponseHeader("content-type"),
                E = H == "xml" || !H && F && F.indexOf("xml") >= 0,
                I = E ? J.responseXML : J.responseText;
            if (E && I.documentElement.tagName == "parsererror") {
                throw "parsererror"
            }
            if (G && G.dataFilter) {
                I = G.dataFilter(I, H)
            }
            if (typeof I === "string") {
                if (H == "script") {
                    o.globalEval(I)
                }
                if (H == "json") {
                    I = l["eval"]("(" + I + ")")
                }
            }
            return I
        },
        param: function(E) {
            var G = [];

            function H(I, J) {
                G[G.length] = encodeURIComponent(I) + "=" + encodeURIComponent(J)
            }
            if (o.isArray(E) || E.jquery) {
                o.each(E, function() {
                    H(this.name, this.value)
                })
            } else {
                for (var F in E) {
                    if (o.isArray(E[F])) {
                        o.each(E[F], function() {
                            H(F, this)
                        })
                    } else {
                        H(F, o.isFunction(E[F]) ? E[F]() : E[F])
                    }
                }
            }
            return G.join("&").replace(/%20/g, "+")
        }
    });
    var m = {},
        n, d = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];

    function t(F, E) {
        var G = {};
        o.each(d.concat.apply([], d.slice(0, E)), function() {
            G[this] = F
        });
        return G
    }
    o.fn.extend({
        show: function(J, L) {
            if (J) {
                return this.animate(t("show", 3), J, L)
            } else {
                for (var H = 0, F = this.length; H < F; H++) {
                    var E = o.data(this[H], "olddisplay");
                    this[H].style.display = E || "";
                    if (o.css(this[H], "display") === "none") {
                        var G = this[H].tagName,
                            K;
                        if (m[G]) {
                            K = m[G]
                        } else {
                            var I = o("<" + G + " />").appendTo("body");
                            K = I.css("display");
                            if (K === "none") {
                                K = "block"
                            }
                            I.remove();
                            m[G] = K
                        }
                        o.data(this[H], "olddisplay", K)
                    }
                }
                for (var H = 0, F = this.length; H < F; H++) {
                    this[H].style.display = o.data(this[H], "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(H, I) {
            if (H) {
                return this.animate(t("hide", 3), H, I)
            } else {
                for (var G = 0, F = this.length; G < F; G++) {
                    var E = o.data(this[G], "olddisplay");
                    if (!E && E !== "none") {
                        o.data(this[G], "olddisplay", o.css(this[G], "display"))
                    }
                }
                for (var G = 0, F = this.length; G < F; G++) {
                    this[G].style.display = "none"
                }
                return this
            }
        },
        _toggle: o.fn.toggle,
        toggle: function(G, F) {
            var E = typeof G === "boolean";
            return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(this, arguments) : G == null || E ? this.each(function() {
                var H = E ? G : o(this).is(":hidden");
                o(this)[H ? "show" : "hide"]()
            }) : this.animate(t("toggle", 3), G, F)
        },
        fadeTo: function(E, G, F) {
            return this.animate({
                opacity: G
            }, E, F)
        },
        animate: function(I, F, H, G) {
            var E = o.speed(F, H, G);
            return this[E.queue === false ? "each" : "queue"](function() {
                var K = o.extend({}, E),
                    M, L = this.nodeType == 1 && o(this).is(":hidden"),
                    J = this;
                for (M in I) {
                    if (I[M] == "hide" && L || I[M] == "show" && !L) {
                        return K.complete.call(this)
                    }
                    if ((M == "height" || M == "width") && this.style) {
                        K.display = o.css(this, "display");
                        K.overflow = this.style.overflow
                    }
                }
                if (K.overflow != null) {
                    this.style.overflow = "hidden"
                }
                K.curAnim = o.extend({}, I);
                o.each(I, function(O, S) {
                    var R = new o.fx(J, K, O);
                    if (/toggle|show|hide/.test(S)) {
                        R[S == "toggle" ? L ? "show" : "hide" : S](I)
                    } else {
                        var Q = S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                            T = R.cur(true) || 0;
                        if (Q) {
                            var N = parseFloat(Q[2]),
                                P = Q[3] || "px";
                            if (P != "px") {
                                J.style[O] = (N || 1) + P;
                                T = ((N || 1) / R.cur(true)) * T;
                                J.style[O] = T + P
                            }
                            if (Q[1]) {
                                N = ((Q[1] == "-=" ? -1 : 1) * N) + T
                            }
                            R.custom(T, N, P)
                        } else {
                            R.custom(T, S, "")
                        }
                    }
                });
                return true
            })
        },
        stop: function(F, E) {
            var G = o.timers;
            if (F) {
                this.queue([])
            }
            this.each(function() {
                for (var H = G.length - 1; H >= 0; H--) {
                    if (G[H].elem == this) {
                        if (E) {
                            G[H](true)
                        }
                        G.splice(H, 1)
                    }
                }
            });
            if (!E) {
                this.dequeue()
            }
            return this
        }
    });
    o.each({
        slideDown: t("show", 1),
        slideUp: t("hide", 1),
        slideToggle: t("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(E, F) {
        o.fn[E] = function(G, H) {
            return this.animate(F, G, H)
        }
    });
    o.extend({
        speed: function(G, H, F) {
            var E = typeof G === "object" ? G : {
                complete: F || !F && H || o.isFunction(G) && G,
                duration: G,
                easing: F && H || H && !o.isFunction(H) && H
            };
            E.duration = o.fx.off ? 0 : typeof E.duration === "number" ? E.duration : o.fx.speeds[E.duration] || o.fx.speeds._default;
            E.old = E.complete;
            E.complete = function() {
                if (E.queue !== false) {
                    o(this).dequeue()
                }
                if (o.isFunction(E.old)) {
                    E.old.call(this)
                }
            };
            return E
        },
        easing: {
            linear: function(G, H, E, F) {
                return E + F * G
            },
            swing: function(G, H, E, F) {
                return ((-Math.cos(G * Math.PI) / 2) + 0.5) * F + E
            }
        },
        timers: [],
        fx: function(F, E, G) {
            this.options = E;
            this.elem = F;
            this.prop = G;
            if (!E.orig) {
                E.orig = {}
            }
        }
    });
    o.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(o.fx.step[this.prop] || o.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        },
        cur: function(F) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var E = parseFloat(o.css(this.elem, this.prop, F));
            return E && E > -10000 ? E : parseFloat(o.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(I, H, G) {
            this.startTime = e();
            this.start = I;
            this.end = H;
            this.unit = G || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var E = this;

            function F(J) {
                return E.step(J)
            }
            F.elem = this.elem;
            if (F() && o.timers.push(F) && !n) {
                n = setInterval(function() {
                    var K = o.timers;
                    for (var J = 0; J < K.length; J++) {
                        if (!K[J]()) {
                            K.splice(J--, 1)
                        }
                    }
                    if (!K.length) {
                        clearInterval(n);
                        n = g
                    }
                }, 13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            o(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(H) {
            var G = e();
            if (H || G >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var E = true;
                for (var F in this.options.curAnim) {
                    if (this.options.curAnim[F] !== true) {
                        E = false
                    }
                }
                if (E) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (o.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        o(this.elem).hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var I in this.options.curAnim) {
                            o.attr(this.elem.style, I, this.options.orig[I])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var J = G - this.startTime;
                this.state = J / this.options.duration;
                this.pos = o.easing[this.options.easing || (o.easing.swing ? "swing" : "linear")](this.state, J, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    o.extend(o.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(E) {
                o.attr(E.elem.style, "opacity", E.now)
            },
            _default: function(E) {
                if (E.elem.style && E.elem.style[E.prop] != null) {
                    E.elem.style[E.prop] = E.now + E.unit
                } else {
                    E.elem[E.prop] = E.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            var G = this[0].getBoundingClientRect(),
                J = this[0].ownerDocument,
                F = J.body,
                E = J.documentElement,
                L = E.clientTop || F.clientTop || 0,
                K = E.clientLeft || F.clientLeft || 0,
                I = G.top + (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop) - L,
                H = G.left + (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft) - K;
            return {
                top: I,
                left: H
            }
        }
    } else {
        o.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            o.offset.initialized || o.offset.initialize();
            var J = this[0],
                G = J.offsetParent,
                F = J,
                O = J.ownerDocument,
                M, H = O.documentElement,
                K = O.body,
                L = O.defaultView,
                E = L.getComputedStyle(J, null),
                N = J.offsetTop,
                I = J.offsetLeft;
            while ((J = J.parentNode) && J !== K && J !== H) {
                M = L.getComputedStyle(J, null);
                N -= J.scrollTop, I -= J.scrollLeft;
                if (J === G) {
                    N += J.offsetTop, I += J.offsetLeft;
                    if (o.offset.doesNotAddBorder && !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(J.tagName))) {
                        N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0
                    }
                    F = G, G = J.offsetParent
                }
                if (o.offset.subtractsBorderForOverflowNotVisible && M.overflow !== "visible") {
                    N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0
                }
                E = M
            }
            if (E.position === "relative" || E.position === "static") {
                N += K.offsetTop, I += K.offsetLeft
            }
            if (E.position === "fixed") {
                N += Math.max(H.scrollTop, K.scrollTop), I += Math.max(H.scrollLeft, K.scrollLeft)
            }
            return {
                top: N,
                left: I
            }
        }
    }
    o.offset = {
        initialize: function() {
            if (this.initialized) {
                return
            }
            var L = document.body,
                F = document.createElement("div"),
                H, G, N, I, M, E, J = L.style.marginTop,
                K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            M = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (E in M) {
                F.style[E] = M[E]
            }
            F.innerHTML = K;
            L.insertBefore(F, L.firstChild);
            H = F.firstChild, G = H.firstChild, I = H.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (G.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
            H.style.overflow = "hidden", H.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (G.offsetTop === -5);
            L.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
            L.style.marginTop = J;
            L.removeChild(F);
            this.initialized = true
        },
        bodyOffset: function(E) {
            o.offset.initialized || o.offset.initialize();
            var G = E.offsetTop,
                F = E.offsetLeft;
            if (o.offset.doesNotIncludeMarginInBodyOffset) {
                G += parseInt(o.curCSS(E, "marginTop", true), 10) || 0, F += parseInt(o.curCSS(E, "marginLeft", true), 10) || 0
            }
            return {
                top: G,
                left: F
            }
        }
    };
    o.fn.extend({
        position: function() {
            var I = 0,
                H = 0,
                F;
            if (this[0]) {
                var G = this.offsetParent(),
                    J = this.offset(),
                    E = /^body|html$/i.test(G[0].tagName) ? {
                        top: 0,
                        left: 0
                    } : G.offset();
                J.top -= j(this, "marginTop");
                J.left -= j(this, "marginLeft");
                E.top += j(G, "borderTopWidth");
                E.left += j(G, "borderLeftWidth");
                F = {
                    top: J.top - E.top,
                    left: J.left - E.left
                }
            }
            return F
        },
        offsetParent: function() {
            var E = this[0].offsetParent || document.body;
            while (E && (!/^body|html$/i.test(E.tagName) && o.css(E, "position") == "static")) {
                E = E.offsetParent
            }
            return o(E)
        }
    });
    o.each(["Left", "Top"], function(F, E) {
        var G = "scroll" + E;
        o.fn[G] = function(H) {
            if (!this[0]) {
                return null
            }
            return H !== g ? this.each(function() {
                this == l || this == document ? l.scrollTo(!F ? H : o(l).scrollLeft(), F ? H : o(l).scrollTop()) : this[G] = H
            }) : this[0] == l || this[0] == document ? self[F ? "pageYOffset" : "pageXOffset"] || o.boxModel && document.documentElement[G] || document.body[G] : this[0][G]
        }
    });
    o.each(["Height", "Width"], function(I, G) {
        var E = I ? "Left" : "Top",
            H = I ? "Right" : "Bottom",
            F = G.toLowerCase();
        o.fn["inner" + G] = function() {
            return this[0] ? o.css(this[0], F, false, "padding") : null
        };
        o.fn["outer" + G] = function(K) {
            return this[0] ? o.css(this[0], F, false, K ? "margin" : "border") : null
        };
        var J = G.toLowerCase();
        o.fn[J] = function(K) {
            return this[0] == l ? document.compatMode == "CSS1Compat" && document.documentElement["client" + G] || document.body["client" + G] : this[0] == document ? Math.max(document.documentElement["client" + G], document.body["scroll" + G], document.documentElement["scroll" + G], document.body["offset" + G], document.documentElement["offset" + G]) : K === g ? (this.length ? o.css(this[0], J) : null) : this.css(J, typeof K === "string" ? K : K + "px")
        }
    })
})();
(function($) {
    $('html').addClass('js');
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
    };
    $.fn.extend({
        getSetSSValue: function(value) {
            if (value) {
                $(this).val(value).change();
                return this;
            } else {
                return selText = $(this).find(':selected').text();
            }
        },
        resetSS: function() {
            $this = $(this);
            $this.next().remove();
            $this.unbind().sSelect();
        }
    });
    $.fn.sSelect = function(options) {
        return this.each(function() {
            var defaults = {
                defaultText: 'Please select',
                animationSpeed: 0,
                ddMaxHeight: ''
            };
            var opts = $.extend(defaults, options),
                $input = $(this),
                $containerDivText = $('<div class="selectedTxt"></div>'),
                $containerDiv = $('<div class="newListSelected" tabindex="0"></div>'),
                $newUl = $('<ul class="newList"></ul>'),
                itemIndex = -1,
                currentIndex = -1,
                keys = [],
                prevKey = false,
                newListItems = '',
                prevented = false;
            $containerDiv.insertAfter($input);
            $containerDivText.prependTo($containerDiv);
            $newUl.appendTo($containerDiv);
            $input.hide();
            if ($input.children('optgroup').length == 0) {
                $input.children().each(function(i) {
                    var option = $(this).text();
                    keys.push(option.charAt(0).toLowerCase());
                    if ($(this).attr('selected') == true) {
                        opts.defaultText = option;
                        currentIndex = i;
                    }
                    newListItems += '<li>' + option + '</li>';
                });
                $newUl.html(newListItems);
                newListItems = '';
                var $newLi = $newUl.children();
            } else {
                $input.children('optgroup').each(function(i) {
                    var optionTitle = $(this).attr('label'),
                        $optGroup = $('<li class="newListOptionTitle">' + optionTitle + '</li>');
                    $optGroup.appendTo($newUl);
                    var $optGroupList = $('<ul></ul>');
                    $optGroupList.appendTo($optGroup);
                    $(this).children().each(function() {
                        ++itemIndex;
                        var option = $(this).text();
                        keys.push(option.charAt(0).toLowerCase());
                        if ($(this).attr('selected') == true) {
                            opts.defaultText = option;
                            currentIndex = itemIndex;
                        }
                        newListItems += '<li>' + option + '</li>';
                    });
                    $optGroupList.html(newListItems);
                    newListItems = '';
                });
                var $newLi = $newUl.find('ul li');
            }
            var newUlHeight = $newUl.height() + 3,
                containerHeight = $containerDiv.height() + 3,
                newLiLength = $newLi.length;
            if (currentIndex != -1) {
                navigateList(currentIndex, true);
            } else {
                $containerDivText.text(opts.defaultText);
            }

            function newUlPos() {
                var containerPosY = $containerDiv.offset().top,
                    docHeight = jQuery(window).height(),
                    scrollTop = jQuery(window).scrollTop();
                if (newUlHeight > parseInt(opts.ddMaxHeight)) {
                    newUlHeight = parseInt(opts.ddMaxHeight);
                }
                containerPosY = containerPosY - scrollTop;
                if (containerPosY + newUlHeight >= docHeight) {
                    $newUl.css({
                        top: '-' + newUlHeight + 'px',
                        height: newUlHeight
                    });
                    $input.onTop = true;
                } else {
                    $newUl.css({
                        top: containerHeight + 'px',
                        height: newUlHeight
                    });
                    $input.onTop = false;
                }
            }
            newUlPos();
            $(window).resize(function() {
                newUlPos();
            });
            $(window).scroll(function() {
                newUlPos();
            });

            function positionFix() {
                $containerDiv.css('position', 'relative');
            }

            function positionHideFix() {
                $containerDiv.css('position', 'static');
            }
            $containerDivText.click(function() {
                if ($newUl.is(':visible')) {
                    $newUl.hide();
                    positionHideFix();
                    return false;
                }
                $containerDiv.focus();
                $newUl.slideDown(opts.animationSpeed);
                positionFix();
                $newUl.scrollTop($input.liOffsetTop);
            });
            $newLi.hover(function(e) {
                var $hoveredLi = $(e.target);
                $hoveredLi.addClass('newListHover');
            }, function(e) {
                var $hoveredLi = $(e.target);
                $hoveredLi.removeClass('newListHover');
            });
            $newLi.click(function(e) {
                var $clickedLi = $(e.target);
                currentIndex = $newLi.index($clickedLi);
                prevented = true;
                navigateList(currentIndex);
                $newUl.hide();
                $containerDiv.css('position', 'static');
            });

            function navigateList(currentIndex, init) {
                var containerOffsetTop = $containerDiv.offset().top,
                    liOffsetTop = $newLi.eq(currentIndex).offset().top,
                    ulScrollTop = $newUl.scrollTop();
                if ($input.onTop == true) {
                    $input.liOffsetTop = (((liOffsetTop - containerOffsetTop) - containerHeight) + ulScrollTop) + parseInt(opts.ddMaxHeight);
                } else {
                    $input.liOffsetTop = ((liOffsetTop - containerOffsetTop) - containerHeight) + ulScrollTop;
                }
                $newUl.scrollTop($input.liOffsetTop);
                $newLi.removeClass('hiLite').eq(currentIndex).addClass('hiLite');
                var text = $newLi.eq(currentIndex).text();
                if (init == true) {
                    $input.val(text);
                    $containerDivText.text(text);
                    return false;
                }
                $input.val(text).change();
                $containerDivText.text(text);
            };
            $input.change(function(event) {
                $targetInput = $(event.target);
                if (prevented == true) {
                    prevented = false;
                    return false;
                }
                $currentOpt = $targetInput.find(':selected');
                currentIndex = $targetInput.find('option').index($currentOpt);
                navigateList(currentIndex, true);
            });

            function keyPress(element) {
                element.onkeydown = function(e) {
                    if (e == null) {
                        var keycode = event.keyCode;
                    } else {
                        var keycode = e.which;
                    }
                    prevented = true;
                    switch (keycode) {
                        case 39:
                            incrementList();
                            return false;
                            break;
                        case 38:
                        case 37:
                            decrementList();
                            return false;
                            break;
                        case 33:
                        case 36:
                            gotoFirst();
                            return false;
                            break;
                        case 34:
                        case 35:
                            gotoLast();
                            return false;
                            break;
                        case 13:
                        case 27:
                            $newUl.hide();
                            positionHideFix();
                            return false;
                            break;
                    }
                    keyPressed = String.fromCharCode(keycode).toLowerCase();
                    var currentKeyIndex = keys.indexOf(keyPressed);
                    if (typeof currentKeyIndex != 'undefined') {
                        ++currentIndex;
                        currentIndex = keys.indexOf(keyPressed, currentIndex);
                        if (currentIndex == -1 || currentIndex == null || prevKey != keyPressed) currentIndex = keys.indexOf(keyPressed);
                        navigateList(currentIndex);
                        prevKey = keyPressed;
                        return false;
                    }
                }
            }

            function incrementList() {
                if (currentIndex < (newLiLength - 1)) {
                    ++currentIndex;
                    navigateList(currentIndex);
                }
            }

            function decrementList() {
                if (currentIndex > 0) {
                    --currentIndex;
                    navigateList(currentIndex);
                }
            }

            function gotoFirst() {
                currentIndex = 0;
                navigateList(currentIndex);
            }

            function gotoLast() {
                currentIndex = newLiLength - 1;
                navigateList(currentIndex);
            }
            $containerDiv.click(function() {
                keyPress(this);
            });
            $containerDiv.focus(function() {
                $(this).addClass('newListSelFocus');
                keyPress(this);
            });
            $containerDiv.blur(function() {
                $(this).removeClass('newListSelFocus');
                $newUl.hide();
                positionHideFix();
            });
            $containerDivText.hover(function(e) {
                var $hoveredTxt = $(e.target);
                $hoveredTxt.parent().addClass('newListSelHover');
            }, function(e) {
                var $hoveredTxt = $(e.target);
                $hoveredTxt.parent().removeClass('newListSelHover');
            });
            $newUl.css('left', '0').hide();
        });
    };
})(jQuery);
navHover = function() {
    var lis = document.getElementById("navmenu-h").getElementsByTagName("LI");
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            this.className += " iehover";
        };
        lis[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp(" iehover\\b"), "");
        }
    }
};
if (window.attachEvent) window.attachEvent("onload", navHover);
defaultload = "YES";
var ttid;
var ddajaxtabssettings = {};
ddajaxtabssettings.bustcachevar = 0;
ddajaxtabssettings.loadstatustext = "<div style='text-align:center; padding-top:50px;'><img role='img' alt='loading icon' src='https://cdn.airfuture.com/img/cfg/loading.gif' /><br>Loading...</div>";

function ddajaxtabs(tabinterfaceid, contentdivid, tt) {
    this.tabinterfaceid = tabinterfaceid;
    this.tabs = document.getElementById(tabinterfaceid).getElementsByTagName("a");
    this.enabletabpersistence = true;
    this.hottabspositions = [];
    this.currentTabIndex = 0;
    this.contentdivid = contentdivid;
    this.defaultHTML = "";
    this.defaultIframe = '<iframe src="about:blank" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0" class="tabcontentiframe" style="width:100%; height:auto; min-height: 100px"></iframe>';
    this.defaultIframe = this.defaultIframe.replace(/<iframe/i, '<iframe name="' + "_ddajaxtabsiframe-" + contentdivid + '" ');
    this.revcontentids = [];
    this.selectedClassTarget = "link"
};
ddajaxtabs.connect = function(pageurl, tabinstance) {
    var page_request = false;
    var bustcacheparameter = "";
    if (window.ActiveXObject) {
        try {
            page_request = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                page_request = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }
    } else if (window.XMLHttpRequest) page_request = new XMLHttpRequest();
    else return false;
    var ajaxfriendlyurl = pageurl.replace(/^http:\/\/[^\/]+\//i, "http://" + window.location.hostname + "/");
    page_request.onreadystatechange = function() {
        ddajaxtabs.loadpage(page_request, pageurl, tabinstance)
    };
    if (ddajaxtabssettings.bustcachevar);
    bustcacheparameter = (ajaxfriendlyurl.indexOf("?") != -1) ? "&" + new Date().getTime() : "?" + new Date().getTime();
    page_request.open('GET', ajaxfriendlyurl + bustcacheparameter, true);
    page_request.send(null)
};
ddajaxtabs.loadpage = function(page_request, pageurl, tabinstance) {
    var divId = tabinstance.contentdivid;
    document.getElementById(divId).innerHTML = ddajaxtabssettings.loadstatustext;
    if (page_request.readyState == 4 && (page_request.status == 200 || window.location.href.indexOf("http") == -1)) {
        document.getElementById(divId).innerHTML = page_request.responseText;
        ddajaxtabs.ajaxpageloadaction(pageurl, tabinstance);
        di = tabinstance.contentdivid;
        if (defaultload == 'NO' && di == "formdivcontainer") {
            change_d()
        }
    }
};
ddajaxtabs.ajaxpageloadaction = function(pageurl, tabinstance) {
    tabinstance.onajaxpageload(pageurl)
};
ddajaxtabs.getCookie = function(Name) {
    var re = new RegExp(Name + "=[^;]+", "i");
    if (document.cookie.match(re)) return document.cookie.match(re)[0].split("=")[1];
    return ""
};
ddajaxtabs.setCookie = function(name, value) {
    document.cookie = name + "=" + value + ";path=/"
};
ddajaxtabs.prototype = {
    expandit: function(tabid_or_position) {
        this.cancelautorun();
        var tabref = "";
        try {
            if (typeof tabid_or_position == "string" && document.getElementById(tabid_or_position).getAttribute("rel")) tabref = document.getElementById(tabid_or_position);
            else if (parseInt(tabid_or_position) != NaN && this.tabs[tabid_or_position].getAttribute("rel")) tabref = this.tabs[tabid_or_position]
        } catch (err) {
            alert("Invalid Tab ID or position entered!")
        };
        if (tabref != "") this.expandtab(tabref)
    },
    cycleit: function(dir, autorun) {
        if (dir == "next") {
            var currentTabIndex = (this.currentTabIndex < this.hottabspositions.length - 1) ? this.currentTabIndex + 1 : 0
        } else if (dir == "prev") {
            var currentTabIndex = (this.currentTabIndex > 0) ? this.currentTabIndex - 1 : this.hottabspositions.length - 1
        }
        if (typeof autorun == "undefined") this.cancelautorun();
        this.expandtab(this.tabs[this.hottabspositions[currentTabIndex]])
    },
    setpersist: function(bool) {
        this.enabletabpersistence = bool
    },
    loadajaxpage: function(pageurl) {
        ddajaxtabs.connect(pageurl, this)
    },
    loadiframepage: function(pageurl) {
        this.iframedisplay(pageurl, this.contentdivid)
    },
    setselectedClassTarget: function(objstr) {
        this.selectedClassTarget = objstr || "link"
    },
    getselectedClassTarget: function(tabref) {
        return (this.selectedClassTarget == ("linkparent".toLowerCase())) ? tabref.parentNode : tabref
    },
    urlparamselect: function(tabinterfaceid) {
        var result = window.location.search.match(new RegExp(tabinterfaceid + "=(\\d+)", "i"));
        return (result == null) ? null : parseInt(RegExp.$1)
    },
    onajaxpageload: function(pageurl) {},
    expandtab: function(tabref) {
        var relattrvalue = tabref.getAttribute("rel");
        var associatedrevids = (tabref.getAttribute("rev")) ? "," + tabref.getAttribute("rev").replace(/\s+/, "") + "," : "";
        if (relattrvalue == "#default") {
            document.getElementById(this.contentdivid).innerHTML = this.defaultHTML
        } else if (relattrvalue == "#iframe") this.iframedisplay(tabref.getAttribute("href"), this.contentdivid);
        else ddajaxtabs.connect(tabref.getAttribute("href"), this);
        this.expandrevcontent(associatedrevids);
        for (var i = 0; i < this.tabs.length; i++) {
            this.getselectedClassTarget(this.tabs[i]).className = (this.tabs[i].getAttribute("href") == tabref.getAttribute("href")) ? "selected" : ""
        }
        if (this.enabletabpersistence) ddajaxtabs.setCookie(this.tabinterfaceid, tabref.tabposition);
        this.setcurrenttabindex(tabref.tabposition)
    },
    iframedisplay: function(pageurl, contentdivid) {
        if (typeof window.frames["_ddajaxtabsiframe-" + contentdivid] != "undefined") {
            try {
                delete window.frames["_ddajaxtabsiframe-" + contentdivid]
            } catch (err) {}
        }
        document.getElementById(contentdivid).innerHTML = this.defaultIframe;
        window.frames["_ddajaxtabsiframe-" + contentdivid].location.replace(pageurl)
    },
    expandrevcontent: function(associatedrevids) {
        var allrevids = this.revcontentids;
        for (var i = 0; i < allrevids.length; i++) {
            document.getElementById(allrevids[i]).style.display = (associatedrevids.indexOf("," + allrevids[i] + ",") != -1) ? "block" : "none"
        }
    },
    setcurrenttabindex: function(tabposition) {
        for (var i = 0; i < this.hottabspositions.length; i++) {
            if (tabposition == this.hottabspositions[i]) {
                this.currentTabIndex = i;
                break
            }
        }
    },
    autorun: function() {
        this.cycleit('next', true)
    },
    cancelautorun: function() {
        if (typeof this.autoruntimer != "undefined") clearInterval(this.autoruntimer)
    },
    init: function(automodeperiod) {
        var persistedtab = ddajaxtabs.getCookie(this.tabinterfaceid);
        var selectedtab = -1;
        var selectedtabfromurl = this.urlparamselect(this.tabinterfaceid);
        this.automodeperiod = automodeperiod || 0;
        this.defaultHTML = document.getElementById(this.contentdivid).innerHTML;
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].tabposition = i;
            if (this.tabs[i].getAttribute("rel")) {
                var tabinstance = this;
                this.hottabspositions[this.hottabspositions.length] = i;
                this.tabs[i].onclick = function() {
                    tabinstance.expandtab(this);
                    tabinstance.cancelautorun();
                    return false
                };
                if (this.tabs[i].getAttribute("rev")) {
                    this.revcontentids = this.revcontentids.concat(this.tabs[i].getAttribute("rev").split(/\s*,\s*/))
                }
                if (selectedtabfromurl == i || this.enabletabpersistence && selectedtab == -1 && parseInt(persistedtab) == i || !this.enabletabpersistence && selectedtab == -1 && this.getselectedClassTarget(this.tabs[i]).className == "selected") {
                    selectedtab = i
                }
            }
        }
        if (selectedtab != -1) {
            this.expandtab(this.tabs[selectedtab])
        } else {
            this.expandtab(this.tabs[this.hottabspositions[0]])
        }
        if (parseInt(this.automodeperiod) > 5000000 && this.hottabspositions.length > 1) {
            this.autoruntimer = setInterval(function() {
                tabinstance.autorun()
            }, this.automodeperiod)
        }
    }
};
var formAlreadySubmitted = false;

function onDateChange(year, month, day, event) {
    var departing = parseDate(document.flights.dep_dt.value);
    var returning = parseDate(document.flights.ret_dt.value);
    if (departing > returning) {
        document.flights.ret_dt.value = addDays(departing, 7)
    }
}

function depart_date_changed() {
    var departing = pick.dep_dt.valueAsDate();
    var returning = pick.ret_dt.valueAsDate();
    if (departing > returning) {
        var returnDateParts = addDays(departing, 7);
        pick.dep_dt.setFromCanonical(returnDateParts)
    }
}

function clearHelpText(field) {
    if (field.value.length > 0 && field.value.indexOf(' start') == 0) {
        field.className = 'searchbox';
        field.value = ''
    }
}

function airlinefocus(id, code) {
    d_d_air('', '', id, code, '', "airline", 30, 180)
}

function hide_border(id) {
    $("#" + id).css('border', 'solid 1px #c4d2df').css('background', '#FFF')
}

function checkdate(str) {
    var dt = str.split("/");
    var returnval = false;
    var monthfield = dt[0];
    var dayfield = dt[1];
    var yearfield = dt[2];
    var dayobj = new Date(yearfield, monthfield - 1, dayfield);
    if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield) || (dayobj.getFullYear() != yearfield)) {
        returnval = false
    } else {
        returnval = true;
        return returnval
    }
}

function addDays(theField, daysToAdd) {
    var fDate = new Date(theField);
    fDate.setDate(fDate.getDate() + daysToAdd);
    var MM = fDate.getMonth() + 1;
    var DD = fDate.getDate();
    var YY = fDate.getFullYear();
    if (MM < 10) MM = "0" + MM;
    if (DD < 10) DD = "0" + DD;
    return MM + "/" + DD + "/" + YY
}
var popunder_co = "";

function flightsubmit() {
    if (formAlreadySubmitted) {
        return false
    }
    var adutl = document.flights.travelers.value;
    var child = document.flights.travelerschd.value;
    var infant = document.flights.travelersinf.value;
    var senior = document.flights.travelerssnr.value;
    var cabin = document.flights.cabin.value;
    adutl = parseInt(adutl, 10);
    child = parseInt(child, 10);
    infant = parseInt(infant, 10);
    senior = parseInt(senior, 10);
    var total = adutl + senior + child + infant;
    var oneway = document.flights.oneway[1].checked;
    var objFromDate = document.flights.dep_date.value;
    var objToDate = document.flights.ret_date.value;
    var FromDate = new Date(objFromDate);
    var ToDate = new Date(objToDate);
    var valCurDate = new Date();
    valCurDate = valCurDate.getMonth() + 1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
    var CurDate = new Date(valCurDate);
    var dateAfterTimes = addDays(valCurDate, 365);
    var dateAfterTime = new Date(dateAfterTimes);
    document.flights.origin.style.border = "1px solid #c4d2df";
    document.flights.destination.style.border = "1px solid #c4d2df";
    document.flights.dep_date.style.border = "1px solid #c4d2df";
    document.flights.ret_date.style.border = "1px solid #c4d2df";
    if ((document.flights.origin.value.length < 1) || (document.flights.origin.value == "Enter Depart City or Airport Code")) {
        document.flights.origin.style.border = "1px solid #FF0000"; /*alert("Please Check and Provide a Valid \'Departure (Origin) City\' or \'Airport Code\'.\nEnter First 3 letters of the City, Airport name or Airport code than select from Drop-Down menu Or click on \'From\' to select Departure City / Airport Code.\n\nExample: For Los Angeles City  Airport code is LAX");*/
        document.flights.origin.focus();
        return false
    } else if ((document.flights.destination.value.length < 1) || (document.flights.destination.value == "Enter Arrival City or Airport Code")) {
        document.flights.destination.style.border = "1px solid #FF0000"; /*alert("Please Check and Provide a Valid \'Arrival (Destination) City\' or \'Airport Code\'.\nEnter First 3 letters of the City, Airport name or Airport code then select from Drop-Down menu Or click on \'To\' to select Arrival City / Airport Code.\n\nExample: For Atlanta City  Airport code is ATL");*/
        document.flights.destination.focus();
        return false
    } else if (document.flights.origincode.value.length < 1) {
        document.flights.origin.style.border = "1px solid #FF0000"; /*alert("Please Verify and Reenter Valid \'Deparure Airport\'.");*/
        document.flights.origin.focus();
        return false
    } else if (document.flights.destcode.value.length < 1) {
        document.flights.destination.style.border = "1px solid #FF0000"; /*alert("Please Verify and Reenter Valid \'Deparure Airport\'.");*/
        document.flights.destination.focus();
        return false
    } else if (document.flights.origincode.value == document.flights.destcode.value) {
        document.flights.destination.style.border = "1px solid #FF0000";
        alert("\'Departure City\' and \'Arrival City\' cannot be same, Please veriify and re-enter.");
        document.flights.destination.focus();
        return false
    } else if (document.flights.dep_date.value == '') {
        document.flights.dep_date.style.border = "1px solid #FF0000"; /*alert("Please click on Calendar Select to the \'Departure Date\'");*/
        document.flights.dep_date.focus();
        return false
    } else if (document.flights.dep_date.value == 'Select Date') {
        document.flights.dep_date.style.border = "1px solid #FF0000"; /*alert("Please click on Calendar Select to the \'Departure Date\'");*/
        document.flights.dep_date.focus();
        return false
    } else if (checkdate(document.flights.dep_date.value) == false) {
        document.flights.dep_date.style.border = "1px solid #FF0000";
        alert("Please enter correct Departure Date.");
        document.flights.dep_date.focus();
        return false
    } else if (FromDate < CurDate) {
        document.flights.dep_date.style.border = "1px solid #FF0000";
        alert("Departure Date can not be before Today. Please enter correct Departure Date.");
        document.flights.dep_date.focus();
        return false
    } else if (FromDate > dateAfterTime) {
        document.flights.dep_date.style.border = "1px solid #FF0000";
        alert("Departure Date should not be more than 1 Year from todays date.");
        document.flights.dep_date.focus();
        return false
    } else if (!oneway && document.flights.ret_date.value == '') {
        document.flights.ret_date.style.border = "1px solid #FF0000"; /*alert("Please click on Calander Select to the \'Return Date\'.\n\nIf you like to Purchase One Way Flight, Please select \'One  Way\' Option above and Proceed.");*/
        document.flights.ret_date.focus();
        return false
    } else if (!oneway && document.flights.ret_date.value == 'Select Date') {
        document.flights.ret_date.style.border = "1px solid #FF0000"; /*alert("Please click on Calander Select to the \'Return Date\'.\n\nIf you like to Purchase One Way Flight, Please select \'One  Way\' Option above and Proceed.");*/
        document.flights.ret_date.focus();
        return false
    } else if (!oneway && checkdate(document.flights.ret_date.value) == false) {
        document.flights.ret_date.style.border = "1px solid #FF0000";
        alert("Please enter correct Return Date.");
        document.flights.ret_date.focus();
        return false
    } else if (!oneway && ToDate < CurDate) {
        document.flights.ret_date.style.border = "1px solid #FF0000";
        alert("Return Date can not be before Today. Please enter correct Return Date.");
        document.flights.ret_date.focus();
        return false
    } else if (!oneway && ToDate > dateAfterTime) {
        document.flights.ret_date.style.border = "1px solid #FF0000";
        alert("Return Date should not be more than 1 Year from todays date.");
        document.flights.ret_date.focus();
        return false
    } else if (!oneway && FromDate > ToDate) {
        document.flights.ret_date.style.border = "1px solid #FF0000";
        alert("Return Date can not be before Departure Date. Please enter correct Return Date.");
        document.flights.ret_date.focus();
        return false
    } else if (document.flights.originregioncode.value != document.flights.destregioncode.value && document.flights.dep_date.value == document.flights.ret_date.value && !oneway) {
        alert("\'Departure Date\' and \'Return Date\' cannot be same in International Travel, Please veriify and re-enter.");
        document.flights.ret_date.focus();
        return false
    } else if (adutl == 0 && senior == 0) {
        alert("Please Select number of Passengers Travelling from Drop-Down Menu.");
        return false
    } else if (document.flights.destcode.value.length < 1) {
        document.flights.destination.style.border = "1px solid #FF0000"; /*alert("Please Verify and Reenter Valid \'Arrival Airport\'.");*/
        document.flights.destination.focus();
        return false
    } else if (total > 9) {
        alert("You have selected more than Nine passengers including Adult, Senior and Child. \n\nWe offer discount for Group Travel.\n\nClick Ok to contact us for your trip.");
        form_flig = $("#flights").serialize();
        window.location = "http://www.cheapfareguru.com/book/support/category.php?cat=cu#for_travel";
        return false
    } else if (infant > adutl + senior) {
        alert("Number of infants cannot exceed number of adults. For example if you have two infant traveling with one adult, \n you can book first infant as lap baby under  infant fare  and book  a seat for second infant under child fare.");
        return false
    } else {
        document.getElementById('fdimgbutton').style.display = 'none';
        document.getElementById('fdimgbuttondown').style.display = 'inline';
        var departing = null;
        var returning = null;
        formAlreadySubmitted = true;
        var or = document.flights.origincode.value;
        var de = document.flights.destcode.value;
        dt1 = document.flights.dep_date.value;
        dt2 = document.flights.ret_date.value;
        if (!oneway) {
            var ow = "n"
        } else {
            var ow = "y"
        }

		var org_val = document.flights.origin.value;
		var orgrcod = document.flights.originregioncode.value;
		var des_val = document.flights.destination.value;
		var desrcod = document.flights.destregioncode.value;
		var dt1_time = document.flights.depart_time.value;
		var dt2_time = document.flights.return_time.value;
		var try_ser = document.flights.try_search.value;
		var ref_ser = document.flights.ref.value;
		popup_links(ow,org_val,or,orgrcod,des_val,de,desrcod,dt1,dt1_time,dt2,dt2_time,adutl,senior,child,infant,cabin,try_ser,ref_ser);

        var eu_ind = get_region_code(document.flights.originregioncode.value, document.flights.destregioncode.value);
        return true
    }
}
var popunder = "";
var winfeatures = "width=1040,height=710,scrollbars=yes,resizable=yes,toolbar=yes,menubar=yes,status=yes,location=yes,left=85,top=20";
var once_per_session = 0;

function get_cookie(Name) {
    var search = Name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue
}

function load_pop_power2(url) {
    var width = '520';
    var height = '600';
    win2 = window.open(url, 'bw', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=510,height=700,');
    win2.blur();
    window.focus()
}

function loadornot() {
    if (get_cookie('popunder') == '') {
        loadpopunder();
        document.cookie = "popunder=yes";
    }
}

function loadpopunder() {
    win2 = window.open(popunder, "", winfeatures);
    win2.blur();
    window.focus();
}

function get_region_code(oriregcode, retregcode) {
    var eu_ind = "o";
    if (oriregcode == 'u') {
        if (retregcode == 'u') {
            eu_ind = "d"
        } else if (retregcode == 'e') {
            eu_ind = "e"
        } else if (retregcode == 'i') {
            eu_ind = 'i'
        } else if (retregcode == 'a') {
            eu_ind = 'a'
        } else if (retregcode == 'c') {
            eu_ind = 'c'
        } else if (retregcode == 's') {
            eu_ind = 's'
        } else if (retregcode == 'f') {
            eu_ind = 'f'
        } else if (retregcode == 't') {
            eu_ind = 't'
        } else {
            eu_ind = "o"
        }
    } else if (oriregcode != 'u') {
        eu_ind = "o"
    }
    return eu_ind
}

function CompDate(adate, bdate, msg) {
    a = adate.split('/');
    b = bdate.split('/');
    var sDate = new Date(a[2], a[0] - 1, a[1]);
    var eDate = new Date(b[2], b[0] - 1, b[1]);
    if (sDate <= eDate) {
        return true;
    } else {
        return false;
    }
}

function validateFormOnSubmit() {
    var adutl = document.multi.travelers.value;
    var child = document.multi.travelerschd.value;
    var infant = document.multi.travelersinf.value;
    var senior = document.multi.travelerssnr.value;
    adutl = parseInt(adutl, 10);
    child = parseInt(child, 10);
    infant = parseInt(infant, 10);
    senior = parseInt(senior, 10);
    var total = adutl + child + senior + infant;
    var valCurDate = new Date();
    valCurDate = valCurDate.getMonth() + 1 + "/" + valCurDate.getDate() + "/" + valCurDate.getFullYear();
    var CurDate = new Date(valCurDate);
    var dateAfterTimes = addDays(valCurDate, 365);
    var dateAfterTime = new Date(dateAfterTimes);
    for (var legnum = 1; legnum <= 2; legnum++) {
        if (document.getElementById("origin_" + legnum).value == '' || document.getElementById("ori_" + legnum).value == '' || document.getElementById("origin_" + legnum).value == 'Enter City or Airport Code') {
            document.getElementById("origin_" + legnum).style.border = "1px solid #FF0000";
            alert("Please enter a valid Origin Airport for Flight " + legnum);
            document.getElementById("origin_" + legnum).focus();
            return false
        } else if (document.getElementById("destination_" + legnum).value == '' || document.getElementById("des_" + legnum).value == '' || document.getElementById("origin_" + legnum).value == 'Enter City or Airport Code') {
            document.getElementById("destination_" + legnum).style.border = "1px solid #FF0000";
            alert("Please enter a valid Destination Airport for Flight " + legnum);
            document.getElementById("destination_" + legnum).focus();
            return false
        } else if (document.getElementById("ori_" + legnum).value == document.getElementById("des_" + legnum).value) {
            document.getElementById("destination_" + legnum).style.border = "1px solid #FF0000";
            alert("\'Departure City\' Flight and \'Arrival City\' cannot be same, Please veriify and re-enter Flight " + legnum);
            document.getElementById("destination_" + legnum).focus();
            return false
        } else if (document.getElementById("dat_" + legnum).value == '') {
            document.getElementById("dat_" + legnum).style.border = "1px solid #FF0000";
            alert("Please click on Calendar Select to the \'Departure Date\' for Flight " + legnum + ".");
            document.getElementById("dat_" + legnum).focus();
            return false
        } else if (document.getElementById("dat_" + legnum).value == 'mm/dd/yyyy') {
            document.getElementById("dat_" + legnum).style.border = "1px solid #FF0000";
            alert("Please click on Calendar Select to the \'Departure Date\' for Flight  " + legnum + ".");
            document.getElementById("dat_" + legnum).focus();
            return false
        } else if (checkdate(document.getElementById("dat_" + legnum).value) == false) {
            document.getElementById("dat_" + legnum).style.border = "1px solid #FF0000";
            alert("Please enter correct Departure Date for Flight  " + legnum + ".");
            document.getElementById("dat_" + legnum).focus();
            return false
        } else if (new Date(document.getElementById("dat_" + legnum).value) < CurDate) {
            document.getElementById("dat_" + legnum).style.border = "1px solid #FF0000";
            alert("Departure Date can not be before Today. Please enter correct Departure Date for Flight  " + legnum + ".");
            document.getElementById("dat_" + legnum).focus();
            return false
        } else if (new Date(document.getElementById("dat_" + legnum).value) > dateAfterTime) {
            document.getElementById("dat_" + legnum).style.border = "1px solid #FF0000";
            alert("Departure Date should not be more than 1 Year from todays date. Please enter correct Departure Date for Flight " + legnum + ".");
            document.getElementById("dat_" + legnum).focus();
            return false
        }
        if (legnum > 1) {
            legnum_new = legnum - 1;
            if (CompDate(document.getElementById("dat_" + legnum).value, document.getElementById("dat_" + legnum_new).value) == true) {
                alert("Flight " + legnum + " takes off before the previous flight, please adjust your dates.");
                document.getElementById("dat_" + legnum).value = "";
                document.getElementById("dat_" + legnum).focus();
                return false
            }
        }
    }
    if (document.getElementById("destination_3").value != '' && document.getElementById("destination_3").value != 'Enter City or Airport Code' && document.getElementById("des_3").value == '') {
        alert("Please enter a valid Destination Airport for Flight 3");
        document.getElementById("destination_3").focus();
        return false
    }
    if (document.getElementById("ori_3").value == document.getElementById("des_3").value) {
        alert("\'Departure City\' Flight and \'Arrival City\' cannot be same, Please veriify and re-enter Flight 3");
        document.getElementById("destination_3").focus();
        return false
    }
    if (document.getElementById("destination_3").value != '' && document.getElementById("des_3").value != '') {
        if (document.getElementById("dat_3").value == '') {
            document.getElementById("dat_3").style.border = "1px solid #FF0000";
            alert("Please click on Calendar Select to the \'Departure Date\' for Flight 3");
            document.getElementById("dat_3").focus();
            return false
        } else if (document.getElementById("dat_3").value == 'mm/dd/yyyy') {
            document.getElementById("dat_3").style.border = "1px solid #FF0000";
            alert("Please click on Calendar Select to the \'Departure Date\' for Flight 3");
            document.getElementById("dat_3").focus();
            return false
        } else if (checkdate(document.getElementById("dat_3").value) == false) {
            document.getElementById("dat_3").style.border = "1px solid #FF0000";
            alert("Please enter correct Departure Date for Flight 3.");
            document.getElementById("dat_3").focus();
            return false
        } else if (new Date(document.getElementById("dat_3").value) < CurDate) {
            document.getElementById("dat_3").style.border = "1px solid #FF0000";
            alert("Departure Date can not be before Today. Please enter correct Departure Date for Flight 3.");
            document.getElementById("dat_3").focus();
            return false
        } else if (new Date(document.getElementById("dat_3").value) > dateAfterTime) {
            document.getElementById("dat_3").style.border = "1px solid #FF0000";
            alert("Departure Date should not be more than 1 Year from todays date. Please enter correct Departure Date for Flight 3.");
            document.getElementById("dat_3").focus();
            return false
        }
    }
    if ((CompDate(document.getElementById("dat_3").value, document.getElementById("dat_2").value) == true) && (document.getElementById("dat_3").value != '' && document.getElementById("des_3").value != '')) {
        alert("Flight 3 takes off before the previous flight, please adjust your dates.");
        document.getElementById("dat_3").focus();
        return false
    }
    if (document.multi.travelers.value == 0 && document.multi.travelerssnr.value == 0) {
        alert("Please Select number of Passengers Travelling from Drop-Down Menu.");
        return false
    }
    if (total > 9) {
        alert("We can Book maximum Nine Seats including Children in one booking. \n\nIf you have more than Nine Passengers Please make separate Booking.");
        return false
    }
    if (infant > adutl + senior) {
        alert("Number of Infants can not be more than Number of Adults");
        return false
    } else {
        document.getElementById('fdimgbutton2').style.display = 'none';
        document.getElementById('fdimgbuttondown2').style.display = '';
        return true
    }
}

function airportfocus(id, code, regioncode, qq, form_type) {
    d_d_air(form_type, qq, id, code, regioncode, "air", 30, 180)
}

function findPosX(obj) {
    var _41 = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            _41 += obj.offsetLeft;
            obj = obj.offsetParent
        }
    } else {
        if (obj.x) {
            _41 += obj.x
        }
    }
    return _41
};

function findPosY(obj) {
    var _43 = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            _43 += obj.offsetTop;
            obj = obj.offsetParent
        }
    } else {
        if (obj.y) {
            _43 += obj.y
        }
    }
    return _43
};
var who;
var ESC = 27;
var TAB = 9;
var ALT = 18;
var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var ENTER = 13;
var SHIFT = 16;
var lastKey = 0;

function keyDown(e) {
    var pK = document.all ? window.event.keyCode : e.which;
    var pK2 = String.fromCharCode(pK).toLowerCase();
    lastKey = pK;
    if (who != null) {
        who(pK, pK2)
    }
};

function keysInit(callback) {
    document.onkeydown = keyDown;
    who = callback;
    if (document.layers) {
        document.captureEvents(Event.KEYPRESS)
    }
};

function noEnter() {
    return lastKey != ENTER
};
var _toolong, _lastsent, _timeout, _itemCount, _idletimer, _cursel, _target;
var _prevsel;
var _inputcode = null,
    _searchtype;
var _targetBG;
var _input = null;
var _numChoices;
var sbHttp = null;
var _stop;
var _sboxminwidth;
var _clientsbcb;
var d_d_air_scc;
var autofill;
autofill = "n";

function d_d_air_c() {

    if ($("#origin").val().trim() != "" && $("#origin").val() != "Please Enter Depart City or Airport Code") {
        $("#from_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="deptCrsSign">');
    } else if ($("#origin").val().trim() == "" || $("#origin").val() == "Please Enter Depart City or Airport Code") {
        $("#from_glyphicon").html("");
    }

    if ($("#destination").val().trim() != "" && $("#destination").val() != "Please Enter Arrival City or Airport Code") {
        $("#to_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="rtrnCrsSign">');
    } else if ($("#destination").val().trim() == "" || $("#destination").val() == "Please Enter Arrival City or Airport Code") {
        $("#to_glyphicon").html("");
    }

    if ($("#origin_1").val().trim() != "" && $("#origin_1").val() != "Enter City or Airport Code") {
        $("#multi_from_1_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="deptCrsSign">');
    } else if ($("#origin_1").val().trim() == "" || $("#origin_1").val() == "Enter City or Airport Code") {
        $("#multi_from_1_glyphicon").html("");
    }

    if ($("#destination_1").val().trim() != "" && $("#destination_1").val() != "Enter City or Airport Code") {
        $("#multi_to_1_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="rtrnCrsSign">');
    } else if ($("#destination_1").val().trim() == "" || $("#destination_1").val() == "Enter City or Airport Code") {
        $("#multi_to_1_glyphicon").html("");
    }

    if ($("#origin_2").val().trim() != "" && $("#origin_2").val() != "Enter City or Airport Code") {
        $("#multi_from_2_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="deptCrsSign">');
    } else if ($("#origin_2").val().trim() == "" || $("#origin_2").val() == "Enter City or Airport Code") {
        $("#multi_from_2_glyphicon").html("");
    }

    if ($("#destination_2").val().trim() != "" && $("#destination_2").val() != "Enter City or Airport Code") {
        $("#multi_to_2_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="rtrnCrsSign">');
    } else if ($("#destination_2").val().trim() == "" || $("#destination_2").val() == "Enter City or Airport Code") {
        $("#multi_to_2_glyphicon").html("");
    }

    if ($("#origin_3").val().trim() != "" && $("#origin_3").val() != "Enter City or Airport Code") {
        $("#multi_from_3_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="deptCrsSign">');
    } else if ($("#origin_3").val().trim() == "" || $("#origin_3").val() == "Enter City or Airport Code") {
        $("#multi_from_3_glyphicon").html("");
    }

    if ($("#destination_3").val().trim() != "" && $("#destination_3").val() != "Enter City or Airport Code") {
        $("#multi_to_3_glyphicon").html('<img role="img" alt="close icon" src="https://cdn.airfuture.com/img/res/crosSign.svg" class="rtrnCrsSign">');
    } else if ($("#destination_3").val().trim() == "" || $("#destination_3").val() == "Enter City or Airport Code") {
        $("#multi_to_3_glyphicon").html("");
    }

    keysInit(null);
    if (_inputcode != null && _inputcode.value != null && _inputcode.value.length < 1) {
        autofill = "y";
        c(0)
    } else {
        autofill = "n"
    }
    d_d_air_abr();
    d_d_air_cls();
    _input = null;
    _stop = false
};

function d_d_air_abr() {
    if (sbHttp != null) {
        if (sbHttp.inprogress) {
            sbHttp.cancelRequest()
        }
    }
};

function d_d_air_cls() {
    if (_target != null) {
        _target.style.display = 'none';
        _target.innerHTML = ""
    }
    if (_targetBG != null) {
        _targetBG.style.display = 'none'
    }
    _stop = true
};

function d_d_air(form_type, form_fill_no, where, wherecode, regcode, searchtype, timeout, minwidth, valuesetcb) {
    form_types = form_type;
    form_fill_nos = form_fill_no;
    form_fill_noss = form_fill_nos - 1;
    _inputcode = _input = _inputregcode = null;
    d_d_air_c();
    var body = document.getElementsByTagName("body")[0];
    _target = document.getElementById('smartbox');
    if (!_target) {
        _target = document.createElement("div");
        _target.id = "smartbox";
        _target.style.zIndex = 510000;
        _target.style.fontWeight = '600';
        _target.style.position = 'absolute';
        _target.style.display = 'none';
        _target.style.width = '380px';
        body.appendChild(_target)
    }
    _target.className = searchtype + "smartboxResults";
    _targetBG = document.getElementById('smartboxBG');
    if (!_targetBG) {
        _targetBG = document.createElement("iframe");
        _targetBG.id = "smartboxBG";
        _targetBG.style.zIndex = 50;
        _targetBG.setAttribute('scrolling', 'no');
        _targetBG.setAttribute('src', 'https://www.cheapfareguru.com/images/blank.gif');
        _targetBG.setAttribute('frameborder', '0');
        _targetBG.style.position = "absolute";
        _targetBG.style.display = "none";
        body.appendChild(_targetBG)
    }
    if (isNaN(parseInt(minwidth))) {
        _sboxminwidth = -1
    } else {
        _sboxminwidth = parseInt(minwidth)
    }
    keysInit(keypressed);
    _input = where;
    _inputcode = wherecode;
    _inputregcode = regcode;
    _searchtype = searchtype;
    _lastsent = "";
    _timeout = timeout;
    _clientsbcb = valuesetcb;
    var x = findPosX(where);
    var y = findPosY(where) + where.offsetHeight + 1;
    _target.style.top = y + 'px';
    _target.style.left = x + 'px';
    if (_idletimer) {
        clearTimeout(_idletimer);
        _idletimer = ''
    }
    _toolong = false;
    _lastsent = "";
    _cursel = -1;
    _prevsel = -1;
    _stop = false
};

function d_d_air_sea(input) {
    if (sbHttp == null) {
        sbHttp = new xml_http()
    }
    if (_searchtype == 'air') {
        var url = 'city_new.php?where=' + encodeURIComponent(_lastsent) + '&input_id=' + input.id;
        var _chars = 3
    } else {
        var url = 'airline_new.php?where=' + encodeURIComponent(_lastsent);
        var _chars = 2
    }
    if (!sbHttp.inprogress) {
        if (_lastsent == _input.value || _input.value.length < _chars) {
            return
        }
        j();

        $('#' + _input.id).css("background", "#FFF url('https://cdn.airfuture.com/img/cfg/loading_autosuggest.gif') right center no-repeat");
        _target.innerHTML = "<div style='margin:0; border:1px solid #C8C8C8;font-weight: bold;padding: 10px; background:#fff;'>loading please wait....</div>";

        window.status = "searching...";
        _lastsent = _input.value;
        var buffer = "where=" + encodeURIComponent(_lastsent);
        var sbHttp = new xml_http();
        buffer += "&lc=en&lc_cc=US";
        if (_searchtype == "air") {
            buffer += "&s=1"
        } else if (_searchtype == "car") {
            buffer += "&s=2"
        } else if (_searchtype == "hotel") {
            buffer += "&s=3"
        } else if (_searchtype == "any") {
            buffer += "&s=4"
        }
        if (d_d_air_scc != null && d_d_air_scc.length > 0) {
            buffer += "&cc=" + d_d_air_scc
        }
        buffer += "&f=h";
        sbHttp.init(url, buffer);
        try {
            sbHttp.setTimeout(10000);
            sbHttp.asyncGET(new _Callback(input))
        } catch (e) {
            alert(e)
        }
    } else {
        alert("busy")
    }
};

function d_d_air_cc(code) {
    d_d_air_scc = code
};

function t() {
    d_d_air_scc = null
};

function f(elem) {
    var list = d_d_air_sbl();
    var retIndex = 0;
    for (var i = 0; i < list.childNodes.length; i++) {
        if (elem == list.childNodes[i]) {
            retIndex = i;
            break
        }
    }
    return retIndex
};

function l(event) {
    //var obj = event ? event.target : this;
    var obj = this;
    _cursel = -1;
    d(-1)
};

function k(event) {
    //var obj = event ? event.target : this;
    var obj = this;
    _cursel = f(obj);
    c(_cursel);
    d_d_air_cls()
};

function o(event) {
    //var obj = event ? event.target : this;
    var obj = this;
    _cursel = f(obj);
    d(_cursel)
};

function j() {
    _target.style.display = 'inline';
    if (_sboxminwidth > _target.offsetWidth) {
        _targetBG.style.width = _sboxminwidth + "px";
        _target.style.width = _sboxminwidth + "px"
    } else {
        _targetBG.style.width = _target.offsetWidth + "px"
    }
    _targetBG.style.height = _target.offsetHeight + "px";
    _targetBG.style.top = _target.style.top;
    _targetBG.style.left = _target.style.left
};

function g() {
    _target.style.display = 'none';
    _targetBG.style.display = 'none'
};

function d_d_air_sbl() {
    var ul;
    for (var i = 0; i < _target.childNodes.length; i++) {
        var node = _target.childNodes[i];
        if (node.nodeName == 'UL') {
            ul = node;
            break
        }
    }

    //----------------------
    if (_target.childNodes.length > 0) {
        $(".depLoc_srchInfo").hide();
        $(".rturnLoc_srchInfo").hide();
    }
    //----------------------	

    return ul
};

function _Callback(input) {
    this.onError = function(status, statusText) {};
    this.onLoad = function done(client) {
        $('#' + _input.id).css("background", "");
        $('.trigger1').hide();
        window.status = "";
        if (!client.cancelled && (_input == input)) {
            _target.innerHTML = client.getText();
            var list = d_d_air_sbl();
            _itemCount = list.childNodes.length;
            if (_itemCount > 0) {
                for (var i = 0; i < list.childNodes.length; i++) {
                    li = list.childNodes[i];
                    li.onmousedown = k;
                    li.onmouseover = o;
                    li.onmouseout = l
                }
                _target.style.width = '380px;';
                j()
            } else {
                g(_input.id)
            }
            _cursel = 0;
            _prevsel = 0;
            d(0)
        }
    }
};

function c(newi) {
    if (newi < 0) {
        _lastsent = "";
        try {
            _inputcode.value = "";
            _inputregcode.value = "";
            _clientsbcb(null)
        } catch (e) {}
    } else if (_itemCount > 0) {
        var list = d_d_air_sbl();
        if (list == null || list.childNodes == null) return;
        var selected = list.childNodes[newi];
        var fields = selected.id.split("-");
        var id;
        var reg;
        var hotels;
        var lmid;
        if (fields.length >= 2) {
            id = fields[1];
            reg = fields[2]
        }
        if (fields.length >= 3) {
            hotels = fields[2]
        }
        if (fields.length >= 4) {
            lmid = fields[3]
        }
        if (id == "NOTFOUND" && reg == "ROUNDFORM") {
            if (_input.id == "origin" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=origin&ori=origincode&region=originregioncode');
                autofill = "n"
            }
            if (_input.id == "destination" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=destination&ori=destcode&region=destregioncode');
                autofill = "n"
            }
        } else if (id == "NOTFOUND" && reg == "MULTIFORM") {
            if (_input.id == "origin_1" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=origin_1&ori=ori_1&region=originregioncode_1');
                autofill = "n"
            }
            if (_input.id == "destination_1" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=destination_1&ori=des_1&region=destinationregioncode_1');
                autofill = "n"
            }
            if (_input.id == "origin_2" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=origin_2&ori=ori_2&region=originregioncode_2');
                autofill = "n"
            }
            if (_input.id == "destination_2" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=destination_2&ori=des_2&region=destinationregioncode_2');
                autofill = "n"
            }
            if (_input.id == "origin_3" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=origin_3&ori=ori_3&region=originregioncode_3');
                autofill = "n"
            }
            if (_input.id == "destination_3" && autofill != "y") {
                taxes_pop_win('airportcode.php?txtbox=destination_3&ori=des_3&region=destinationregioncode_3');
                autofill = "n"
            }
        } else if (id == "NO" && reg == "AIR") {
            taxes_pop_win('prf_airline.php?airline_name=' + _input.id);
            autofill = "n"
        } else {
            _inputcode.value = id;
            _inputregcode.value = reg;
            if (selected.innerText != undefined) {
                _input.value = selected.innerText;
                if (form_types == 'sep_city' && form_fill_nos == "ori") {
                    document.getElementById("destination_ret").value = document.getElementById("origin").value;
                    document.getElementById("destcode_ret").value = document.getElementById("origincode").value;
                    document.getElementById("destregioncode_ret").value = document.getElementById("originregioncode").value
                }
                if (form_types == 'sep_city' && form_fill_nos == "des") {
                    document.getElementById("origin_ret").value = document.getElementById("destination").value;
                    document.getElementById("origincode_ret").value = document.getElementById("destcode").value;
                    document.getElementById("originregioncode_ret").value = document.getElementById("destregioncode").value
                }
                if (form_types == 'des' && form_fill_nos != "4") {
                    document.getElementById("origin_" + form_fill_nos).value = document.getElementById("destination_" + form_fill_noss).value;
                    document.getElementById("ori_" + form_fill_nos).value = document.getElementById("des_" + form_fill_noss).value;
                    document.getElementById("originregioncode_" + form_fill_nos).value = document.getElementById("destinationregioncode_" + form_fill_noss).value
                }
            } else {
                _input.value = selected.textContent;
                if (form_types == 'des' && form_fill_nos != "4") {
                    document.getElementById("origin_" + form_fill_nos).value = document.getElementById("destination_" + form_fill_noss).value;
                    document.getElementById("ori_" + form_fill_nos).value = document.getElementById("des_" + form_fill_noss).value;
                    document.getElementById("originregioncode_" + form_fill_nos).value = document.getElementById("destinationregioncode_" + form_fill_noss).value
                }
                if (form_types == 'sep_city' && form_fill_nos == "ori") {
                    document.getElementById("destination_ret").value = document.getElementById("origin").value;
                    document.getElementById("destcode_ret").value = document.getElementById("origincode").value;
                    document.getElementById("destregioncode_ret").value = document.getElementById("originregioncode").value
                }
                if (form_types == 'sep_city' && form_fill_nos == "des") {
                    document.getElementById("origin_ret").value = document.getElementById("destination").value;
                    document.getElementById("origincode_ret").value = document.getElementById("destcode").value;
                    document.getElementById("originregioncode_ret").value = document.getElementById("destregioncode").value
                }
            }
        }
        try {
            if (typeof _clientsbcb == 'function') {
                var cbData = new Object();
                cbData.str = selected.innerHTML;
                cbData.hc = hotels;
                cbData.id = id;
                cbData.lmid = lmid;
                _clientsbcb(cbData)
            }
        } catch (ignored) {}
    }
};

function d(newi) {
    var list = d_d_air_sbl();
    if (list.childNodes.length > 0) {
        if (_prevsel >= 0) {
            var prev = list.childNodes[_prevsel];
            prev.className = prev.className.replace('smartboxItemHi', "")
        }
        if (newi >= 0) {
            if (list.childNodes.length > 0) {
                var cur = list.childNodes[newi];
                cur.className = cur.className + " smartboxItemHi"
            }
            _prevsel = newi
        }
    }
};
var _pressed = 0;

function keypressed(keycode, keyvalue) {
    clearTimeout(_idletimer);
    _pressed = new Date().getTime();
    switch (keycode) {
        case LEFT:
        case UP:
            _cursel = _cursel - 1;
            if (_cursel < 0) {
                _cursel = 0
            }
            d(_cursel);
            break;
        case RIGHT:
        case DOWN:
            _cursel++;
            if (_cursel >= _itemCount) {
                _cursel = _itemCount - 1
            }
            d(_cursel);
            break;
        case ENTER:
            if (_itemCount > 0) {
                c(_cursel);
                d_d_air_cls()
            }
            break;
        case ESC:
            d_d_air_cls();
            break;
        case TAB:
            if (_cursel >= 0 && _cursel < _itemCount) {
                c(_cursel)
            }
        case ALT:
        case SHIFT:
            break;
        default:
            c(-1);
            _idletimer = self.setTimeout('idle()', _timeout)
    }
};

function r() {
    var v = (_stop == null || _stop != true);
    _stop = false;
    return (v ? true : noEnter())
};

function idle(input) {
    if (noEnter()) {
        var now = new Date().getTime();
        if (now - _pressed > _timeout) {
            clearTimeout(_idletimer);
            _typer(_input)
        } else {
            clearTimeout(_idletimer);
            _idletimer = self.setTimeout('idle()', _timeout)
        }
    }
};

function _typer(input) {
    if ((_input != null) && _input.value.length > 0) {
        d_d_air_abr();
        d_d_air_sea(input)
    } else {
        c(-1);
        d_d_air_cls()
        //--------------
        $(".depLoc_srchInfo").show();
        $(".rturnLoc_srchInfo").show();
        //--------------
    }
};

function m() {
    return (window.opera) ? false : true
}

function fireTimer(_1) {
    var _2 = _1;

    function timerFired() {
        if (_2.inprogress) {
            _2._abortRequest(_2);
        }
    };
    _2._timeoutID = window.setTimeout(timerFired, _2.timeoutMS);
};

function xml_http() {};
xml_http.prototype = {
    uservars: null,
    url: null,
    postbuffer: null,
    xmlhttp: null,
    inprogress: false,
    thecallback: null,
    timeoutMS: -1,
    _timeoutID: null,
    cancelled: false,
    init: function(_3, _4, _5) {
        this.url = _3;
        this.uservars = _5;
        this.postbuffer = _4;
        if (window.XMLHttpRequest) {
            this.xmlhttp = new XMLHttpRequest();
        } else {
            if (window.ActiveXObject) {
                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                window.alert("Sorry your browser is not compatible with this functionality");
            }
        }
    },
    setTimeout: function(_6) {
        this.timeoutMS = _6;
    },
    asyncGET: function(_7) {
        if (this.inprogress) {
            throw "Call in progress";
        }
        var _8 = this;
        if (_7 == null) {
            _7 = _8;
        }
        this.thecallback = _7;
        var _9 = null;
        if (this.postbuffer == null) {
            this.xmlhttp.open("GET", this.url, true);
        } else {
            this.xmlhttp.open("POST", this.url, true);
            this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            _9 = this.postbuffer;
        }
        this.xmlhttp.onreadystatechange = function() {
            _8.stateChangeCallback(_8);
        };
        this.inprogress = true;
        this.cancelled = false;
        this.xmlhttp.send(_9);
        if (this.timeoutMS > 0) {
            fireTimer(this);
        }
    },
    stateChangeCallback: function(_a) {
        switch (_a.xmlhttp.readyState) {
            case 1:
                try {
                    if (!_a.cancelled) {
                        _a.thecallback.onInit();
                    }
                } catch (e) {}
                break;
            case 2:
                try {
                    if (_a.xmlhttp.status != 200 && _a.xmlhttp.status != 0) {
                        if (!_a.cancelled) {
                            window.status = "error";
                            _a.thecallback.onError(_a.xmlhttp.status, _a.xmlhttp.statusText, _a);
                        }
                        _a.xmlhttp.abort();
                        _a.inprogress = false;
                    }
                } catch (e) {}
                break;
            case 3:
                var _b;
                try {
                    try {
                        _b = _a.xmlhttp.getResponseHeader("Content-Length");
                    } catch (e) {
                        _b = NaN;
                    }
                    if (!_a.cancelled) {
                        window.status = "ping";
                        _a.thecallback.onProgress(_a.xmlhttp.responseText, _b);
                    }
                } catch (e) {}
                break;
            case 4:
                try {
                    if (_a._timeoutID) {
                        window.clearTimeout(_a._timeoutID);
                        _a._timeoutID = null;
                    }
                    if (_a.inprogress) {
                        _a.inprogress = false;
                        if (!_a.cancelled) {
                            window.status = "done";
                            _a.thecallback.onLoad(_a);
                        }
                    }
                } catch (e) {} finally {
                    _a.inprogress = false;
                }
                break;
        }
    },
    cancelRequest: function() {
        var _c = this;
        this.cancelled = true;
        if (this._timeoutID) {
            window.clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
        _c._abortRequest(_c);
    },
    _abortRequest: function(_d) {
        if (_d.xmlhttp != null) {
            try {
                _d.xmlhttp.abort();
                if (_d.inprogress) {
                    window.status = "abort";
                    _d.thecallback.onError("timeout", "Your request has timed out.", _d);
                }
            } catch (e) {}
            _d.cancelled = true;
            _d.inprogress = false;
        }
    },
    getText: function() {
        return this.xmlhttp.responseText;
    },
    getXML: function() {
        return this.xmlhttp.responseXML;
    },
    getTags: function(_e) {
        try {
            return this.xmlhttp.responseXML.getElementsByTagName(_e);
        } catch (e) {
            return null;
        }
    },
    getOperaText: function(_f, _10, _11) {
        try {
            var _12 = _f.getElementsByTagName(_10)[_11];
            if (_12) {
                var _13 = "",
                    i = 0,
                    _15;
                while (_15 = _12.childNodes[i]) {
                    _13 += _15.nodeValue;
                    i++;
                }
                return _13;
            } else {
                return "";
            }
        } catch (e) {
            opera.postError("exception: " + e);
        }
    },
    getOpera: function(_16, _17, _18) {
        return "foo";
    },
    getTagText: function(_19, _1a, _1b) {
        var _1c = _19.getElementsByTagName(_1a)[_1b];
        if (_1c) {
            if (_1c.childNodes.length > 1) {
                return _1c.childNodes[1].nodeValue;
            } else {
                if (_1c.childNodes.length == 1) {
                    return _1c.firstChild.nodeValue;
                }
            }
        } else {
            return "";
        }
    },
    onProgress: function(t, l) {},
    onError: function(s, t, c) {},
    onLoad: function(c) {},
    onInit: function(c) {}
};
(function($) {
    $.extend($.ui, {
        datepicker: {
            version: "1.7.2"
        }
    });
    var PROP_NAME = "datepicker";

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "close[x]",
            prevText: "&nbsp;&laquo;",
            nextText: "&nbsp;&raquo;",
            currentText: "Current Month",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "show",
            showOptions: {},
            defaultDate: "",
            appendText: "",
            buttonText: "Click here for calendar",
            buttonImage: "img/cal.png",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            showMonthAfterYear: false,
            yearRange: "-10:+10",
            showOtherMonths: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: 0,
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function() {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                target.id = "dp" + (++this.uuid)
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([:\[\]\.])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append)
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
                        $.datepicker._hideDatepicker()
                    } else {
                        $.datepicker._showDatepicker(target)
                    }
                    return false
                })
            }
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst)
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst));
            this._updateDatepicker(inst);
            this._updateAlternate(inst)
        },
        _dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                var id = "dp" + (++this.uuid);
                this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            this._dialogInput.val(dateText);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", this._pos[0] + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == "string") {
                return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker(null)
                }
                var date = this._getDateDatepicker(target);
                extendRemove(inst.settings, settings);
                this._setDateDatepicker(target, date);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function(target, date, endDate) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date, endDate);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(null, "");
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass + ", td." + $.datepicker._currentClass, inst.dpDiv);
                        if (sel[0]) {
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                        } else {
                            $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"))
                        }
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._clearDate(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._gotoToday(event.target)
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, -7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) {
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) {
                            $.datepicker._adjustDate(event.target, +7, "D")
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            $.datepicker._hideDatepicker(null, "");
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.rangeStart = null;
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim") || "show";
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function() {
                    $.datepicker._datepickerShowing = true;
                    if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
                        $("iframe.ui-datepicker-cover").css({
                            width: inst.dpDiv.width() + 4,
                            height: inst.dpDiv.height() + 4
                        })
                    }
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim](duration, postProcess)
                }
                if (duration == "") {
                    postProcess()
                }
                if (inst.input[0].type != "hidden") {
                    inst.input[0].focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function(inst) {
            var dims = {
                width: inst.dpDiv.width() + 4,
                height: inst.dpDiv.height() + 4
            };
            var self = this;
            inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
                width: dims.width,
                height: dims.height
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function() {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover")
                }
            }).bind("mouseover", function() {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover")
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 220;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "px")
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst.input && inst.input[0].type != "hidden" && inst == $.datepicker._curInst) {
                $(inst.input[0]).focus()
            }
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
            var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
            offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
            return offset
        },
        _findPos: function(obj) {
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj.nextSibling
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function(input, duration) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (inst.stayOpen) {
                this._selectDate("#" + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
            }
            inst.stayOpen = false;
            if (this._datepickerShowing) {
                duration = (duration != null ? duration : this._get(inst, "duration"));
                var showAnim = this._get(inst, "showAnim");
                var postProcess = function() {
                    $.datepicker._tidyDialog(inst)
                };
                if (duration != "" && $.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(duration == "" ? "hide" : (showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide")))](duration, postProcess)
                }
                if (duration == "") {
                    this._tidyDialog(inst)
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
            this._curInst = null
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target);
            if (($target.parents("#" + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker(null, "")
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
                inst.input[0].focus()
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            if (inst.stayOpen) {
                inst.endDay = inst.endMonth = inst.endYear = null
            }
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            if (inst.stayOpen) {
                inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                this._updateDatepicker(inst)
            }
        },
        _clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst.stayOpen = false;
            inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                if (!inst.stayOpen) {
                    this._hideDatepicker(null, this._get(inst, "duration"));
                    this._lastInput = inst.input[0];
                    if (typeof(inst.input[0]) != "object") {
                        inst.input[0].focus()
                    }
                    this._lastInput = null
                }
            }
        },
        _updateAlternate: function(inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function(date) {
            var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
            var firstDay = firstMon.getDay() || 7;
            firstMon.setDate(firstMon.getDate() + 1 - firstDay);
            if (firstDay < 4 && checkDate < firstMon) {
                checkDate.setDate(checkDate.getDate() - 3);
                return $.datepicker.iso8601Week(checkDate)
            } else {
                if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
                    firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
                    if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
                        return 1
                    }
                }
            }
            return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var getNumber = function(match) {
                lookAhead(match);
                var origSize = (match == "@" ? 14 : (match == "y" ? 4 : (match == "o" ? 3 : 2)));
                var size = origSize;
                var num = 0;
                while (size > 0 && iValue < value.length && value.charAt(iValue) >= "0" && value.charAt(iValue) <= "9") {
                    num = num * 10 + parseInt(value.charAt(iValue++), 10);
                    size--
                }
                if (size == origSize) {
                    throw "Missing number at position " + iValue
                }
                return num
            };
            var getName = function(match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                var size = 0;
                for (var j = 0; j < names.length; j++) {
                    size = Math.max(size, names[j].length)
                }
                var name = "";
                var iInit = iValue;
                while (size > 0 && iValue < value.length) {
                    name += value.charAt(iValue++);
                    for (var i = 0; i < names.length; i++) {
                        if (name == names[i]) {
                            return i + 1
                        }
                    }
                    size--
                }
                throw "Unknown name at position " + iInit
            };
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue
                }
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral()
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            checkLiteral()
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw "Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        formatDate: function(format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++
                }
                return matches
            };
            var formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = "0" + num
                    }
                }
                return num
            };
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case "d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case "D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case "o":
                                var doy = date.getDate();
                                for (var m = date.getMonth() - 1; m >= 0; m--) {
                                    doy += this._getDaysInMonth(date.getFullYear(), m)
                                }
                                output += formatNumber("o", doy, 3);
                                break;
                            case "m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case "M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case "y":
                                output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case "@":
                                output += date.getTime();
                                break;
                            case "'":
                                if (lookAhead("'")) {
                                    output += "'"
                                } else {
                                    literal = true
                                }
                                break;
                            default:
                                output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function(format) {
            var chars = "";
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            chars += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (lookAhead("'")) {
                                chars += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst) {
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.input ? inst.input.val() : null;
            inst.endDay = inst.endMonth = inst.endYear = null;
            var date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                date = defaultDate
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function(inst) {
            var date = this._determineDate(this._get(inst, "defaultDate"), new Date());
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date
        },
        _determineDate: function(date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function(offset, getDaysInMonth) {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || "d") {
                        case "d":
                        case "D":
                            day += parseInt(matches[1], 10);
                            break;
                        case "w":
                        case "W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                        case "y":
                        case "Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            };
            date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date, this._getDaysInMonth) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(date)
        },
        _daylightSavingAdjust: function(date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function(inst, date, endDate) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._determineDate(date, new Date());
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if (origMonth != inst.selectedMonth || origYear != inst.selectedYear) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var stepBigMonths = this._get(inst, "stepBigMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a role="button" aria-label="'+prevText+'" class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span aria-label="'+prevText+'" class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a role="button" aria-label="'+prevText+'" class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span aria-label="'+prevText+'" class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a role="button" aria-label="'+nextText+'" class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span aria-label="'+nextText+'" class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a role="button" aria-label="'+nextText+'" class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span aria-label="'+nextText+'" class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = "";
            var monthNav = "";
            var inMinYear = (minDate && minDate.getFullYear() == drawYear);
            var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
            monthNav += '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
            for (var month = 0; month < 12; month++) {
                if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                    var monthNamesShortNew = new Array();
                    monthNamesShortNew[0] = "Jan";
                    monthNamesShortNew[1] = "Feb";
                    monthNamesShortNew[2] = "Mar";
                    monthNamesShortNew[3] = "Apr";
                    monthNamesShortNew[4] = "May";
                    monthNamesShortNew[5] = "Jun";
                    monthNamesShortNew[6] = "Jul";
                    monthNamesShortNew[7] = "Aug";
                    monthNamesShortNew[8] = "Sep";
                    monthNamesShortNew[9] = "Oct";
                    monthNamesShortNew[10] = "Nov";
                    monthNamesShortNew[11] = "Dec";
                    monthNav += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShortNew[month] + "</option>"
                }
            }
            monthNav += "</select>";
            var years = this._get(inst, "yearRange").split(":");
            var year = 0;
            var endYear = 0;
            if (years.length != 2) {
                year = drawYear - 10;
                endYear = drawYear + 10
            } else {
                if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
                    year = drawYear + parseInt(years[0], 10);
                    endYear = drawYear + parseInt(years[1], 10)
                } else {
                    year = parseInt(years[0], 10);
                    endYear = parseInt(years[1], 10)
                }
            }
            year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
            endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
            monthNav += '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
            for (; year <= endYear; year++) {
                monthNav += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
            }
            monthNav += "</select>";
            var date_dep_ret = "";
            if (inst.id == "dep_dt" || inst.id == "ret_dt") {
                var date_dep_s = "Depart : <b>Not Selected</b>";
                var date_ret_s = "Return : <b>Not Selected</b>";
                var oneway_show_d = document.flights.oneway[1].checked;
                if ($("#dep_dt").val() != "" && $("#dep_dt").val() != "mm/dd/yyyy" && checkdate($("#dep_dt").val()) == true) {
                    var d_dep_d_e = new Date($("#dep_dt").val());
                    date_dep_s = "Depart : <b>" + dateFormat(d_dep_d_e, "d mmm yy") + "</b>"
                }
                if ($("#ret_dt").val() != "" && $("#ret_dt").val() != "mm/dd/yyyy" && checkdate($("#ret_dt").val()) == true) {
                    var d_ret_d_e = new Date($("#ret_dt").val());
                    date_ret_s = "Return : <b>" + dateFormat(d_ret_d_e, "d mmm yy") + "</b>"
                }
                if (oneway_show_d) {
                    date_ret_s = ""
                }
                date_dep_ret = "<div style='clear:both' ></div><div style='color:#cf0104; border-top:1px solid #FFB9B9; margin-top:5px; font-size:13px; '><div style='float:left; width:200px;padding:5px; padding-left:10px; text-align:center;'>" + date_dep_s + "</div><div style='float:left; width:200px;padding:5px; text-align:center;'>" + date_ret_s + "</div><div style='clear:both'></div></div>"
            }
            if (inst.id == "dat_1") {
                var date_dep_s = "Selected Date : <b>Not Selected</b>";
                var date_ret_s = "";
                if ($("#dat_1").val() != "" && $("#dat_1").val() != "mm/dd/yyyy" && checkdate($("#dat_1").val()) == true) {
                    var d_dep_d_e = new Date($("#dat_1").val());
                    date_dep_s = "Selected Date : <b>" + dateFormat(d_dep_d_e, "d mmm yy") + "</b>"
                }
                date_dep_ret = "<div style='clear:both' ></div><div style='color:#cf0104; border-top:1px solid #FFB9B9; margin-top:5px; font-size:13px; '><div style='float:left; width:200px;padding:5px; padding-left:10px; text-align:center;'>" + date_dep_s + "</div><div style='float:left; width:200px;padding:5px; text-align:center;'>" + date_ret_s + "</div><div style='clear:both'></div></div>"
            }
            if (inst.id == "dat_2") {
                var date_dep_s = "Last Flight : <b>Not Selected</b>";
                var date_ret_s = "Current Flight : <b>Not Selected</b>";
                if ($("#dat_1").val() != "" && $("#dat_1").val() != "mm/dd/yyyy" && checkdate($("#dat_1").val()) == true) {
                    var d_dep_d_e = new Date($("#dat_1").val());
                    date_dep_s = "Last Flight : <b>" + dateFormat(d_dep_d_e, "d mmm yy") + "</b>"
                }
                if ($("#dat_2").val() != "" && $("#dat_2").val() != "mm/dd/yyyy" && checkdate($("#dat_2").val()) == true) {
                    var d_ret_d_e = new Date($("#dat_2").val());
                    date_ret_s = "Current Flight : <b>" + dateFormat(d_ret_d_e, "d mmm yy") + "</b>"
                }
                date_dep_ret = "<div style='clear:both' ></div><div style='color:#cf0104; border-top:1px solid #FFB9B9; margin-top:5px; font-size:13px; '><div style='float:left; width:200px;padding:5px; padding-left:10px; text-align:center;'>" + date_dep_s + "</div><div style='float:left; width:200px;padding:5px; text-align:center;'>" + date_ret_s + "</div><div style='clear:both'></div></div>"
            }
            if (inst.id == "dat_3") {
                var date_dep_s = "Last Flight : <b>Not Selected</b>";
                var date_ret_s = "Current Flight : <b>Not Selected</b>";
                if ($("#dat_2").val() != "" && $("#dat_2").val() != "mm/dd/yyyy" && checkdate($("#dat_2").val()) == true) {
                    var d_dep_d_e = new Date($("#dat_2").val());
                    date_dep_s = "Last Flight : <b>" + dateFormat(d_dep_d_e, "d mmm yy") + "</b>"
                }
                if ($("#dat_3").val() != "" && $("#dat_3").val() != "mm/dd/yyyy" && checkdate($("#dat_3").val()) == true) {
                    var d_ret_d_e = new Date($("#dat_3").val());
                    date_ret_s = "Current Flight : <b>" + dateFormat(d_ret_d_e, "d mmm yy") + "</b>"
                }
                date_dep_ret = "<div style='clear:both' ></div><div style='color:#cf0104; border-top:1px solid #FFB9B9; margin-top:5px; font-size:13px; '><div style='float:left; width:200px;padding:5px; padding-left:10px; text-align:center;'>" + date_dep_s + "</div><div style='float:left; width:200px;padding:5px; text-align:center;'>" + date_ret_s + "</div><div style='clear:both'></div></div>"
            }

            //var buttonPanel=(showButtonPanel)?'<div style="clear:both; padding-top:5px;"></div><div class="">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<div style="float:left; width:112px;padding-top:5px;padding-left:5px;" ><a role="button" href="javascript:void(0)" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" style="color:#cf0104;" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\"><span style='text-decoration:underline;'>"+currentText+"</span></a></div>":'<div style="float:left; width:117px;">&nbsp;</div>')+(isRTL?"":controls)+"<div style='float:left; width:150px;'><div class='monthsNav' >"+monthNav+"</div></div><div style='clear:both'></div></div><div style='clear:both'></div>"+date_dep_ret+"":"";

            var buttonPanel = date_dep_ret;

            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                var close_btn = (!inst.inline ? '<a role="button" aria-label="close" href="javascript:void(0)" style="color:#cf0104;" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</a>" : "");
                group += "<div style='padding:7px; border-bottom:1px solid #FFB9B9; color:#cf0104;'><div style='float:left;'>Today is " + dateFormat(new Date(), "d mmmm yyyy") + "</div><div style='float:right;'>" + close_btn + "</div><div style='clear:both;'></div></div>";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group ui-datepicker-group-';
                        switch (col) {
                            case 0:
                                calender += "first";
                                cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += "last";
                                cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += "middle";
                                cornerClass = "";
                                break
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><div class="ui-datepicker_side_border"><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = "";
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = "";
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : " onclick=\"DP_jQuery.datepicker._selectDay('#" + inst.id + "'," + drawMonth + "," + drawYear + ', this);return false;"') + ">" + (otherMonth ? (showOtherMonths ? printDate.getDate() : "&#xa0;") : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a role="button" aria-label="' + printDate.getDate() + '" class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? ' ui-state-active" style="color:#FFF;"' : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table></div>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '' : "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
            minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span> "
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? "&#xa0;" : "")
            }
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var year = 0;
                var endYear = 0;
                if (years.length != 2) {
                    year = drawYear - 10;
                    endYear = drawYear + 10
                } else {
                    if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
                        year = drawYear + parseInt(years[0], 10);
                        endYear = drawYear + parseInt(years[1], 10)
                    } else {
                        year = parseInt(years[0], 10);
                        endYear = parseInt(years[1], 10)
                    }
                }
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                }
                html += "</select>"
            }
            if (showMonthAfterYear) {
                html += (secondary || changeMonth || changeYear ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._daylightSavingAdjust(new Date(year, month, day));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function(inst, minMax, checkRange) {
            var date = this._determineDate(this._get(inst, minMax + "Date"), null);
            return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date))
        },
        _getDaysInMonth: function(year, month) {
            return 32 - new Date(year, month, 32).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
            newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
            var minDate = newMinDate || this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate))
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }
    $.fn.datepicker = function(options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function() {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.7.2";
    window.DP_jQuery = $
})(jQuery);

function popUp(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=350,height=120,left = 470,top = 200');");
}

function copy_airport(form_fill_no) {
    form_filled_no = form_fill_no - 1;
    if (document.getElementById("des_" + form_filled_no).value != "" && document.getElementById("origin_" + form_fill_no).value == "") {
        document.getElementById("origin_" + form_fill_no).value = document.getElementById("destination_" + form_filled_no).value;
        document.getElementById("ori_" + form_fill_no).value = document.getElementById("des_" + form_filled_no).value;
        document.getElementById("originregioncode_" + form_fill_no).value = document.getElementById("destinationregioncode_" + form_filled_no).value;
    }
}

function check_seg(seg_no) {
    sg = 0;
    for (var legnum = 2; legnum <= 6; legnum++) {
        legnums = legnum - 1;
        if (document.getElementById("ori_" + legnum).value == "From" || document.getElementById("des_" + legnums).value == "To") {
            return false
        } else if (document.getElementById("ori_" + legnum).value == "" || document.getElementById("des_" + legnums).value == "") {
            return false
        } else if (document.getElementById("ori_" + legnum).value != document.getElementById("des_" + legnums).value) {
            sg++
        }
    }
}
jQuery.cookie = function(key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1
        }
        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setDate(t.getDate() + days)
        }
        value = String(value);
        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
    }
    options = value || {};
    var result, decode = options.raw ? function(s) {
        return s
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
};

function str_replace(search, replace, subject, count) {
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = r instanceof Array,
        sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}

function val_replace(str) {
    return str_replace(['+'], [' '], str);
}

function addSlashes(input) {
    var v = input.value;
    if (v.match(/^\d{2}$/) !== null) {
        input.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        input.value = v + '/';
    }
}(function(a) {
    var c = (a.browser.msie ? "paste" : "input") + ".mask";
    var b = (window.orientation != undefined);
    a.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        }
    };
    a.fn.extend({
        caret: function(e, f) {
            if (this.length == 0) {
                return
            }
            if (typeof e == "number") {
                f = (typeof f == "number") ? f : e;
                return this.each(function() {
                    if (this.setSelectionRange) {
                        this.focus();
                        this.setSelectionRange(e, f)
                    } else {
                        if (this.createTextRange) {
                            var g = this.createTextRange();
                            g.collapse(true);
                            g.moveEnd("character", f);
                            g.moveStart("character", e);
                            g.select()
                        }
                    }
                })
            } else {
                if (this[0].setSelectionRange) {
                    e = this[0].selectionStart;
                    f = this[0].selectionEnd
                } else {
                    if (document.selection && document.selection.createRange) {
                        var d = document.selection.createRange();
                        e = 0 - d.duplicate().moveStart("character", -100000);
                        f = e + d.text.length
                    }
                }
                return {
                    begin: e,
                    end: f
                }
            }
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(j, d) {
            if (!j && this.length > 0) {
                var f = a(this[0]);
                var g = f.data("tests");
                return a.map(f.data("buffer"), function(l, m) {
                    return g[m] ? l : null
                }).join("")
            }
            d = a.extend({
                placeholder: "_",
                completed: null
            }, d);
            var k = a.mask.definitions;
            var g = [];
            var e = j.length;
            var i = null;
            var h = j.length;
            a.each(j.split(""), function(m, l) {
                if (l == "?") {
                    h--;
                    e = m
                } else {
                    if (k[l]) {
                        g.push(new RegExp(k[l]));
                        if (i == null) {
                            i = g.length - 1
                        }
                    } else {
                        g.push(null)
                    }
                }
            });
            return this.each(function() {
                var r = a(this);
                var m = a.map(j.split(""), function(x, y) {
                    if (x != "?") {
                        return k[x] ? d.placeholder : x
                    }
                });
                var n = false;
                var q = r.val();
                r.data("buffer", m).data("tests", g);

                function v(x) {
                    while (++x <= h && !g[x]) {}
                    return x
                }

                function t(x) {
                    while (!g[x] && --x >= 0) {}
                    for (var y = x; y < h; y++) {
                        if (g[y]) {
                            m[y] = d.placeholder;
                            var z = v(y);
                            if (z < h && g[y].test(m[z])) {
                                m[y] = m[z]
                            } else {
                                break
                            }
                        }
                    }
                    s();
                    r.caret(Math.max(i, x))
                }

                function u(y) {
                    for (var A = y, z = d.placeholder; A < h; A++) {
                        if (g[A]) {
                            var B = v(A);
                            var x = m[A];
                            m[A] = z;
                            if (B < h && g[B].test(x)) {
                                z = x
                            } else {
                                break
                            }
                        }
                    }
                }

                function l(y) {
                    var x = a(this).caret();
                    var z = y.keyCode;
                    n = (z < 16 || (z > 16 && z < 32) || (z > 32 && z < 41));
                    if ((x.begin - x.end) != 0 && (!n || z == 8 || z == 46)) {
                        w(x.begin, x.end)
                    }
                    if (z == 8 || z == 46 || (b && z == 127)) {
                        t(x.begin + (z == 46 ? 0 : -1));
                        return false
                    } else {
                        if (z == 27) {
                            r.val(q);
                            r.caret(0, p());
                            return false
                        }
                    }
                }

                function o(B) {
                    if (n) {
                        n = false;
                        return (B.keyCode == 8) ? false : null
                    }
                    B = B || window.event;
                    var C = B.charCode || B.keyCode || B.which;
                    var z = a(this).caret();
                    if (B.ctrlKey || B.altKey || B.metaKey) {
                        return true
                    } else {
                        if ((C >= 32 && C <= 125) || C > 186) {
                            var x = v(z.begin - 1);
                            if (x < h) {
                                var A = String.fromCharCode(C);
                                if (g[x].test(A)) {
                                    u(x);
                                    m[x] = A;
                                    s();
                                    var y = v(x);
                                    a(this).caret(y);
                                    if (d.completed && y == h) {
                                        d.completed.call(r)
                                    }
                                }
                            }
                        }
                    }
                    return false
                }

                function w(x, y) {
                    for (var z = x; z < y && z < h; z++) {
                        if (g[z]) {
                            m[z] = d.placeholder
                        }
                    }
                }

                function s() {
                    return r.val(m.join("")).val()
                }

                function p(y) {
                    var z = r.val();
                    var C = -1;
                    for (var B = 0, x = 0; B < h; B++) {
                        if (g[B]) {
                            m[B] = d.placeholder;
                            while (x++ < z.length) {
                                var A = z.charAt(x - 1);
                                if (g[B].test(A)) {
                                    m[B] = A;
                                    C = B;
                                    break
                                }
                            }
                            if (x > z.length) {
                                break
                            }
                        } else {
                            if (m[B] == z[x] && B != e) {
                                x++;
                                C = B
                            }
                        }
                    }
                    if (!y && C + 1 < e) {
                        r.val("");
                        w(0, h)
                    } else {
                        if (y || C + 1 >= e) {
                            s();
                            if (!y) {
                                r.val(r.val().substring(0, C + 1))
                            }
                        }
                    }
                    return (e ? B : i)
                }
                if (!r.attr("readonly")) {
                    r.one("unmask", function() {
                        r.unbind(".mask").removeData("buffer").removeData("tests")
                    }).bind("focus.mask", function() {
                        q = r.val();
                        var x = p();
                        s();
                        setTimeout(function() {
                            if (x == j.length) {
                                r.caret(0, x)
                            } else {
                                r.caret(x)
                            }
                        }, 0)
                    }).bind("blur.mask", function() {
                        p();
                        if (r.val() != q) {
                            r.change()
                        }
                    }).bind("keydown.mask", l).bind("keypress.mask", o).bind(c, function() {
                        setTimeout(function() {
                            r.caret(p(true))
                        }, 0)
                    })
                }
                p()
            })
        }
    })
})(jQuery);

function taxes_pop_win(url) {
    window.open(url, "Window1", "menubar=no,width=670,height=600,toolbar=no,scrollbars=1");
}
$(document).ready(function() {
    defaultload = 'NO';
    var dep_mask = 0;
    var ret_mask = 0;
    var dat_1_mask = 0;
    var dat_2_mask = 0;
    var dat_3_mask = 0;
    $('#dep_dt').keypress(function() {
        if (dep_mask == 0) {
            $("#dep_dt").mask("99/99/9999")
        }
        dep_mask = 1
    });
    $('#ret_dt').keypress(function() {
        if (ret_mask == 0) {
            $("#ret_dt").mask("99/99/9999")
        }
        ret_mask = 1
    });
    $('#dat_1').keypress(function() {
        if (dat_1_mask == 0) {
            $("#dat_1").mask("99/99/9999")
        }
        dat_1_mask = 1
    });
    $('#dat_2').keypress(function() {
        if (dat_2_mask == 0) {
            $("#dat_2").mask("99/99/9999")
        }
        dat_2_mask = 1
    });
    $('#dat_3').keypress(function() {
        if (dat_3_mask == 0) {
            $("#dat_3").mask("99/99/9999")
        }
        dat_3_mask = 1
    })
});

function ValidateDate(a, b) {
    hide_border(b.id);
    var SDate = document.getElementById("dep_dt").value;
    var EDate = document.getElementById("ret_dt").value;
    var alertReason1 = 'End Date must be greater than or equal to  Start Date.';
    var alertReason2 = 'End Date can not be less than Current Date.';
    var endDate = new Date(EDate);
    var startDate = new Date(SDate);
    if (b.id == "dep_dt" && $('#roundtrip').is(':checked')) {
        window.setTimeout(function() {
            $("#ret_dt").focus();
        }, 10);
    }
    if (SDate != '' && EDate != '' && startDate > endDate) {
        document.getElementById("ret_dt").value = "";
        return false
    } else if (SDate == '') {
        return false
    } else if (EDate == '') {
        return false
    }
}
$(function() {
    $('#dep_dt, #ret_dt,#dat_1,#dat_2,#dat_3').datepicker({
        numberOfMonths: [1, 2],
        showButtonPanel: true,
        beforeShow: customRange,
        showAnim: "show",
        showOn: 'both',
        buttonImageOnly: true,
        minDate: 0,
        maxDate: '+12M',
        onSelect: ValidateDate
    })
});

function customRange(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (a.id == 'ret_dt') {
        if ($('#dep_dt').datepicker('getDate') != null) {
            c = $('#dep_dt').datepicker('getDate')
        }
    }
    return {
        minDate: c
    }
}

function chbg() {}

function chbg1() {}

function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select()
}
var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function(val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val
        };
    return function(date, mask, utc) {
        var dF = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined
        }
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) mask = String(dF.masks[mask] || mask || dF.masks["default"]);
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true
        }
        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };
        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc)
};

function main_tip_box(id) {
    $(".main_tip_box").hide();
    $('#' + id).css('zIndex', '99999');
    $('#' + id).css('zIndex', '99999');
    $('#' + id).show()
}

function main_tip_box_cls(id) {
    $('#' + id).hide()
}

function taxes_fees() {
    newwindow = window.open('http://www.cheapfareguru.com/book/taxes_fees.php', 'name', 'height=600,width=600')
}

function baggage_fees() {
    newwindow = window.open('http://www.cheapfareguru.com/book/air_baggage_new.php', 'name', 'height=600,width=800')
}

function ddtabcontent(tabinterfaceid) {
    this.tabinterfaceid = tabinterfaceid;
    this.tabs = document.getElementById(tabinterfaceid).getElementsByTagName("a");
    this.enabletabpersistence = true;
    this.hottabspositions = [];
    this.currentTabIndex = 0;
    this.subcontentids = [];
    this.revcontentids = [];
    this.selectedClassTarget = "link"
}
ddtabcontent.getCookie = function(Name) {
    var re = new RegExp(Name + "=[^;]+", "i");
    if (document.cookie.match(re)) return document.cookie.match(re)[0].split("=")[1];
    return ""
};
ddtabcontent.setCookie = function(name, value) {};
ddtabcontent.prototype = {
    expandit: function(tabid_or_position) {
        this.cancelautorun();
        var tabref = "";
        try {
            if (typeof tabid_or_position == "string" && document.getElementById(tabid_or_position).getAttribute("rel")) tabref = document.getElementById(tabid_or_position);
            else if (parseInt(tabid_or_position) != NaN && this.tabs[tabid_or_position].getAttribute("rel")) tabref = this.tabs[tabid_or_position]
        } catch (err) {
            alert("Invalid Tab ID or position entered!")
        };
        if (tabref != "") this.expandtab(tabref)
    },
    cycleit: function(dir, autorun) {
        if (dir == "next") {
            var currentTabIndex = (this.currentTabIndex < this.hottabspositions.length - 1) ? this.currentTabIndex + 1 : 0
        } else if (dir == "prev") {
            var currentTabIndex = (this.currentTabIndex > 0) ? this.currentTabIndex - 1 : this.hottabspositions.length - 1
        }
        if (typeof autorun == "undefined") this.cancelautorun();
        this.expandtab(this.tabs[this.hottabspositions[currentTabIndex]])
    },
    setpersist: function(bool) {
        this.enabletabpersistence = bool
    },
    setselectedClassTarget: function(objstr) {
        this.selectedClassTarget = objstr || "link"
    },
    getselectedClassTarget: function(tabref) {
        return (this.selectedClassTarget == ("linkparent".toLowerCase())) ? tabref.parentNode : tabref
    },
    urlparamselect: function(tabinterfaceid) {
        var result = window.location.search.match(new RegExp(tabinterfaceid + "=(\\d+)", "i"));
        return (result == null) ? null : parseInt(RegExp.$1)
    },
    expandtab: function(tabref) {
        var subcontentid = tabref.getAttribute("rel");
        var associatedrevids = (tabref.getAttribute("rev")) ? "," + tabref.getAttribute("rev").replace(/\s+/, "") + "," : "";
        this.expandsubcontent(subcontentid);
        this.expandrevcontent(associatedrevids);
        for (var i = 0; i < this.tabs.length; i++) {
            this.getselectedClassTarget(this.tabs[i]).className = (this.tabs[i].getAttribute("rel") == subcontentid) ? "selected" : ""
        }
        if (this.enabletabpersistence);
        ddtabcontent.setCookie(this.tabinterfaceid, tabref.tabposition);
        this.setcurrenttabindex(tabref.tabposition)
    },
    expandsubcontent: function(subcontentid) {
        for (var i = 0; i < this.subcontentids.length; i++) {
            var subcontent = document.getElementById(this.subcontentids[i]);
            subcontent.style.display = (subcontent.id == subcontentid) ? "block" : "none"
        }
    },
    expandrevcontent: function(associatedrevids) {
        var allrevids = this.revcontentids;
        for (var i = 0; i < allrevids.length; i++) {
            document.getElementById(allrevids[i]).style.display = (associatedrevids.indexOf("," + allrevids[i] + ",") != -1) ? "block" : "none"
        }
    },
    setcurrenttabindex: function(tabposition) {
        for (var i = 0; i < this.hottabspositions.length; i++) {
            if (tabposition == this.hottabspositions[i]) {
                this.currentTabIndex = i;
                break
            }
        }
    },
    autorun: function() {
        this.cycleit('next', true)
    },
    cancelautorun: function() {
        if (typeof this.autoruntimer != "undefined") clearInterval(this.autoruntimer)
    },
    init: function(automodeperiod) {
        var persistedtab = ddtabcontent.getCookie(this.tabinterfaceid);
        var selectedtab = -1;
        var selectedtabfromurl = this.urlparamselect(this.tabinterfaceid);
        this.automodeperiod = automodeperiod || 0;
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].tabposition = i;
            if (this.tabs[i].getAttribute("rel")) {
                var tabinstance = this;
                this.hottabspositions[this.hottabspositions.length] = i;
                this.subcontentids[this.subcontentids.length] = this.tabs[i].getAttribute("rel");
                this.tabs[i].onclick = function() {
                    tabinstance.expandtab(this);
                    tabinstance.cancelautorun();
                    return false
                };
                if (this.tabs[i].getAttribute("rev")) {
                    this.revcontentids = this.revcontentids.concat(this.tabs[i].getAttribute("rev").split(/\s*,\s*/))
                }
                if (selectedtabfromurl == i || this.enabletabpersistence && selectedtab == -1 && parseInt(persistedtab) == i || !this.enabletabpersistence && selectedtab == -1 && this.getselectedClassTarget(this.tabs[i]).className == "selected") {
                    selectedtab = i
                }
            }
        }
        if (selectedtab != -1) this.expandtab(this.tabs[selectedtab]);
        else this.expandtab(this.tabs[this.hottabspositions[0]]);
        if (parseInt(this.automodeperiod) > 500 && this.hottabspositions.length > 1) {
            this.autoruntimer = setInterval(function() {
                tabinstance.autorun()
            }, this.automodeperiod)
        }
    }
};
var tooltip = function() {
    var id = 'tt';
    var top = 3;
    var left = -58;
    var maxw = 300;
    var speed = 100;
    var timer = 5;
    var endalpha = 195;
    var alpha = 0;
    var tt, t, c, b, h;
    var ie = document.all ? true : false;
    return {
        show: function(v, w) {
            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                t = document.createElement('div');
                t.setAttribute('id', id + 'top');
                c = document.createElement('div');
                c.setAttribute('id', id + 'cont');
                b = document.createElement('div');
                b.setAttribute('id', id + 'bot');
                tt.appendChild(t);
                tt.appendChild(c);
                tt.appendChild(b);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos
            }
            tt.style.display = 'block';
            c.innerHTML = v;
            tt.style.width = w ? w + 'px' : 'auto';
            if (!w && ie) {
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block'
            }
            if (tt.offsetWidth > maxw) {
                tt.style.width = maxw + 'px'
            }
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function() {
                tooltip.fade(1)
            }, timer)
        },
        pos: function(e) {
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px'
        },
        fade: function(d) {
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a
                } else if (alpha < speed && d == -1) {
                    i = a
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')'
            } else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none'
                }
            }
        },
        hide: function() {
            clearInterval(tt.timer);
            tt.timer = setInterval(function() {
                tooltip.fade(-1)
            }, timer)
        }
    }
}();
var xmlhttp;

function save() {
    var email = document.getElementById("email").value;
    if (email == "") {
        alert("Please Enter E-mail");
        document.getElementById("email").focus();
        return false
    }
    var emailreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email.match(emailreg)) {
        alert("Please Enter Valid E-mail");
        document.getElementById("email").focus();
        return false
    }
    xmlhttp = GetXmlHttpObject();
    if (xmlhttp == null) {
        alert("Please udgrade your browser");
        return false
    }
    var url = "save_email.php?email=" + email;
    xmlhttp.onreadystatechange = stateChange;
    xmlhttp.open("POST", url, true);
    xmlhttp.send(null);

    function stateChange() {
        if (xmlhttp.readyState == 4) {
            document.getElementById("msg").innerHTML = xmlhttp.responseText;
            var val = document.getElementById("msg").innerHTML;
            var a = val.search("Thanks");
            if (a == -1) {
                document.getElementById("msg").style.display = '';
                document.getElementById("text1").style.display = '';
                document.getElementById("email").value = ''
            } else {
                document.getElementById("msg").style.display = '';
                document.getElementById("text1").style.display = 'none'
            }
        }
    }

    function GetXmlHttpObject() {
        if (window.XMLHttpRequest) return new XMLHttpRequest;
        if (window.ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
        return null
    }
}

function show_overview() {}

function hide_overview() {}

function versign_link() {
    newwindow = window.open('https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.CheapFareGuru.com&lang=en', 'name', 'height=600,width=600')
}

function goto_URL(object) {
    window.location.href = object.options[object.selectedIndex].value
}