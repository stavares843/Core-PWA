import * as FileSystem from '~/libraries/Files/FileSystem'

describe("createFile", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.createFile("script.py", ["data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"])
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.createFile("note.txt", ["data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"])
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.createFile("image.png", ["data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"])
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.createFile("note.txt", ["data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"])
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.createFile("index.js", ["data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xmlcharset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"])
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.createFile("", [])
        expect(result).toMatchSnapshot()
    })
})

describe("getChild", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.getChild("George")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.getChild("Anas")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.getChild("Edmond")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.getChild("Michael")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.getChild("Jean-Philippe")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.getChild("")
        expect(result).toMatchSnapshot()
    })
})

describe("hasChild", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.hasChild("Jean-Philippe")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.hasChild("Michael")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.hasChild("Pierre Edouard")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.hasChild("George")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.hasChild("Anas")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.hasChild("")
        expect(result).toMatchSnapshot()
    })
})

describe("removeChild", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.removeChild("Pierre Edouard")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.removeChild("Michael")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.removeChild("Anas")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.removeChild("Jean-Philippe")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.removeChild("Edmond")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.removeChild("")
        expect(result).toMatchSnapshot()
    })
})

describe("renameChild", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.renameChild("Janet Homenick", "/usr/ports")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.renameChild("Janet Homenick", "/usr/sbin")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.renameChild("Gail Hoppe", "/usr/share")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.renameChild("Ronald Keeling", "/opt/share")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.renameChild("Maurice Purdy", "/usr/share")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.renameChild("", "")
        expect(result).toMatchSnapshot()
    })
})

describe("copyChild", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.copyChild("Michael")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.copyChild("George")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.copyChild("Edmond")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.copyChild("Jean-Philippe")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.copyChild("Anas")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.copyChild("")
        expect(result).toMatchSnapshot()
    })
})

describe("printCurrentDirectory", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.printCurrentDirectory()
        expect(result).toMatchSnapshot()
    })
})

describe("openDirectory", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.openDirectory("/path/to/file")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.openDirectory("C:\\\\path\\to\\folder\\")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.openDirectory(".")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.openDirectory("path/to/file.ext")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.openDirectory("path/to/folder/")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.openDirectory("")
        expect(result).toMatchSnapshot()
    })
})

describe("goBack", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.goBack(0.0)
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.goBack(0)
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.goBack(-1)
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.goBack(1)
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.goBack(200)
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.goBack(NaN)
        expect(result).toMatchSnapshot()
    })
})

describe("goBackToDirectory", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.goBackToDirectory("C:\\\\path\\to\\file.ext")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.goBackToDirectory("/path/to/file")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.goBackToDirectory("path/to/folder/")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.goBackToDirectory("./path/to/file")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.goBackToDirectory("C:\\\\path\\to\\folder\\")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.goBackToDirectory("")
        expect(result).toMatchSnapshot()
    })
})

describe("moveItemTo", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.moveItemTo("Jean-Philippe", "/net/panel.dvi.crd")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.moveItemTo("Anas", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.moveItemTo("Michael", "/tmp/payment_invoice.ogg.cmc")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.moveItemTo("Edmond", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.moveItemTo("Pierre Edouard", "/net/panel.dvi.crd")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.moveItemTo("", "")
        expect(result).toMatchSnapshot()
    })
})

describe("getDirectoryFromPath", () => {
    let inst: any

    beforeEach(() => {
        inst = new FileSystem.FileSystem()
    })

    test("0", () => {
        let result: any = inst.getDirectoryFromPath("/tmp/payment_invoice.ogg.cmc/usr/sbin/tan_district.geo.qxt")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = inst.getDirectoryFromPath("/tmp/payment_invoice.ogg.cmc")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = inst.getDirectoryFromPath("/usr/sbin/tan_district.geo.qxt")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = inst.getDirectoryFromPath("/var/up_pink.stl.atx")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = inst.getDirectoryFromPath("/net/panel.dvi.crd")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = inst.getDirectoryFromPath("")
        expect(result).toMatchSnapshot()
    })
})