'use strict';

define(['load-html', 'sinon'], function(loadHtml, sinon) {
    describe('load-html', function() {
        var sandbox = sinon.sandbox.create();

        describe('ajax', function() {
            it('should should make an ajax call', function(done) {
                sandbox.stub(chrome.extension, 'getURL').returns('chrome://gibberish_id/somefile.html');
                sandbox.stub($, 'ajax').yieldsTo('success', 'Some File\'s Content');

                loadHtml('somefile.html', function(data) {
                    $.ajax.should.have.been.calledWith(sinon.match.has('url', 'chrome://gibberish_id/somefile.html')
                                                  .and(sinon.match.has('dataType', 'html'))
                                                  .and(sinon.match.has('success', sinon.match.func)));
                    data.should.equal('Some File\'s Content');
                    done();
                });
            });
        });

        afterEach(function() {
            $('#sandbox').empty();
            $('#sandbox').off();
            sandbox.restore();
        });
    });
});
