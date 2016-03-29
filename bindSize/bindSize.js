/**
 * Created by George Kormaris on 29/03/16.
 */

function bindSize(original, copy, dimension) {
  'use strict';

  /**
   * Represents an element whose dimensions are bound to another element.
   *
   * @constructor
   * @param {Element} original - The element from which to get dimensions.
   * @param {Element} copy - The element to have its dimensions bound.
   * @param {string} dimension - Bind *'width'*, *'height'* or both if not defined.
   */
  var Bound = function(original, copy, dimension) {
    this._original = original;
    this._copy = copy;
    this._running = true;
    this.dimension = dimension;
    // Avoid excessive .offset* calls
    this._storedHeight = 0;
    this._storedWidth = 0;
    this._curHeight = 0;
    this._curWidth = 0;

    if (this.dimension === 'width') {
      window.requestAnimationFrame(this._widthUpdater.bind(this));
    } else if (dimension === 'height') {
      window.requestAnimationFrame(this._heightUpdater.bind(this));
    } else {
      window.requestAnimationFrame(this._allUpdater.bind(this));
    }
  };

  Bound.prototype._heightUpdater = function() {
    this._curHeight = this._original.offsetHeight;
    if (this._curHeight !== this._storedHeight) {
      this._copy.style.setProperty('height', this._curHeight + 'px');
      this._storedHeight = this._curHeight;
    }
    window.requestAnimationFrame(this._heightUpdater.bind(this));
  };

  Bound.prototype._widthUpdater = function() {
    this._curWidth = this._original.offsetWidth;
    if (this._curWidth !== this._storedWidth) {
      this._copy.style.setProperty('width', this._curWidth + 'px');
      this._storedWidth = this._curWidth;
    }
    window.requestAnimationFrame(this._widthUpdater.bind(this));
  };

  Bound.prototype._allUpdater = function() {
    this._curWidth = this._original.offsetWidth;
    this._curHeight = this._original.offsetHeight;
    if (this._curWidth !== this._storedWidth) {
      this._copy.style.setProperty('width', this._curWidth + 'px');
      this._storedWidth = this._curWidth;
    }
    if (this._curHeight !== this._storedHeight) {
      this._copy.style.setProperty('height', this._curHeight + 'px');
      this._storedHeight = this._curHeight;
    }
    if (this._running === true) {
      window.requestAnimationFrame(this._allUpdater.bind(this));
    }
  };

  /**
   * Stop updating the bound object's dimensions.
   * To reset its dimensions use `.reset()`
   */
  Bound.prototype.stop = function() {
    this._running = false;
  };

  /**
   * Resets the bound object's dimensions.
   */
  Bound.prototype.reset = function() {
    this._copy.style.removeProperty('height');
    this._copy.style.removeProperty('width');
  };

  return new Bound(original, copy, dimension);
}

