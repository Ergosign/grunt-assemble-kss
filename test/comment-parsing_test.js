var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var grunt = require('grunt');

var kssCommentsParser = require('../lib/kssCommentsParser');

describe("parsing of comments", function () {

    var sections;

    beforeEach(function () {
        sections = {
            level: 0
        };
    });

    describe('a single line comment', function () {

        var minimalComment;

        beforeEach(function () {
            minimalComment = {
                comment: '/* Just a Comment */',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should be ignored', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(minimalComment, sections, grunt);

            createdTestSection.should.equal(-1);
        });
    });

    describe('a minimal comment', function () {

        var minimalComment;

        beforeEach(function () {
            minimalComment = {
                comment: '/*\nTitle \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should create a section object', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(minimalComment, sections, grunt);

            createdTestSection.should.not.equal(-1);
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(minimalComment, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(minimalComment, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a srcPath', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(minimalComment, sections, grunt);

            createdTestSection.should.have.property('srcPath').and.equal("doesNotExist/pathIsJustForTesting");
        });
    });

    describe('a comment with description', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description");
        });
    });

    describe('a comment with multi line description', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3 \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });
    });

    describe('a comment with hbs file as markup', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3\nMarkup: test.hbs\nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

    });

    describe('a comment with multiline html as markup', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3\nMarkup: <div><p>first line</p>\n<span>second line</span></div>\nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("<div><p>first line</p>\n<span>second line</span></div>");
        });

    });

    describe('a comment with one variation class', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3\nMarkup: test.hbs\n\n.test-class - testdescr \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have a variation', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('variations');
            chai.expect(createdTestSection.variations).to.deep.equal([{
                variationName: ".test-class",
                variationDescription: "testdescr",
                variationClass: "test-class"
            }]);
        });
    });

    describe('a comment with multiple variation classes', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3\nMarkup: test.hbs\n.test-class - testdescr\n.test-class2.test-class--modifier - testdescr2 \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have variations', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('variations');
            chai.expect(createdTestSection.variations).to.deep.equal([
                {variationName: ".test-class", variationDescription: "testdescr", variationClass: "test-class"},
                {
                    variationName: ".test-class2.test-class--modifier",
                    variationDescription: "testdescr2",
                    variationClass: "test-class2 test-class--modifier"
                }
            ]);
        });
    });

    describe('a comment with variation classes and states (hover, focus)', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\nDescription Line 2\nLine 3\nMarkup: test.hbs\n\n.test-class - testdescr\n.test-class2 - testdescr2\n:hover - hoverState\n:focus - focusState   \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });
        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });
        it('should have a multi line description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description\nDescription Line 2\nLine 3");
        });
        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have variations with states', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('variations');
            chai.expect(createdTestSection.variations).to.deep.equal([
                {variationName: ".test-class", variationDescription: "testdescr", variationClass: "test-class"},
                {variationName: ".test-class2", variationDescription: "testdescr2", variationClass: "test-class2"},
                {variationName: ":hover", variationDescription: "hoverState", variationClass: "pseudo-class-hover"},
                {variationName: ":focus", variationDescription: "focusState", variationClass: "pseudo-class-focus"}
            ]);
        });
    });

    describe('a comment with property wrapper-classes', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\n\n\nMarkup: test.hbs\n\nwrapper-classes: background-dark \n\n\nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have a property wrapper-classes', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('properties');
            chai.expect(createdTestSection.properties).to.deep.equal({"wrapper-classes": ["background-dark"]});
        });
    });

    describe('a comment with multiple property', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\n\n\nMarkup: test.hbs\n\nwrapper-classes: background-dark, min-height , overflow \nWeight: -12  \n\n\nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have properties', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('properties');
            chai.expect(createdTestSection.properties).to.deep.equal(
                {"wrapper-classes": ["background-dark", "min-height", "overflow"],
                "weight": ["-12"]}
            );
        });
    });

    describe('a comment with markup, variations, states and properties', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle\nA Test Description\n\n\nMarkup: test.hbs\n.test-class - testdescr\n.test-class2 - testdescr2\n:hover - hoverState\n:focus - focusState \n\nwrapper-classes: background-dark, min-height , overflow \nWeight: -12  \n\n\nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a description', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('description').and.equal("A Test Description");
        });

        it('should have a markup', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('markup').and.equal("test.hbs");
        });

        it('should have variations with states', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('variations');
            chai.expect(createdTestSection.variations).to.deep.equal([
                {variationName: ".test-class", variationDescription: "testdescr", variationClass: "test-class"},
                {variationName: ".test-class2", variationDescription: "testdescr2", variationClass: "test-class2"},
                {variationName: ":hover", variationDescription: "hoverState", variationClass: "pseudo-class-hover"},
                {variationName: ":focus", variationDescription: "focusState", variationClass: "pseudo-class-focus"}
            ]);
        });

        it('should have properties', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('properties');
            chai.expect(createdTestSection.properties).to.deep.equal(
                {"wrapper-classes": ["background-dark", "min-height", "overflow"],
                    "weight": ["-12"]}
            );
        });
    });

    describe('a comment with only title, name and property', function () {

        var commentWithDescription;

        beforeEach(function () {
            commentWithDescription = {
                comment: '/*\nTitle  \nWeight: -12 \nStyleguide testSection \n*/',
                srcPath: "doesNotExist/pathIsJustForTesting"
            };
        });

        it('should have a title', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionTitle').and.equal("Title");
        });

        it('should have a sectionName', function () {

            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);

            createdTestSection.should.have.property('sectionName').and.equal("testSection");
        });

        it('should have a property', function () {
            var createdTestSection = kssCommentsParser.getSectionObjectOfKssComment(commentWithDescription, sections, grunt);
            createdTestSection.should.have.property('properties');
            chai.expect(createdTestSection.properties).to.deep.equal(
                {"weight": ["-12"]}
            );
        });
    });

    describe('a pending test', function () {

        it("pending test description")
    });

});