<template>
  <div class="canvas">
    <draggable v-model="elements" @end="onEnd">
      <div
        v-for="(element, index) in elements"
        :key="element.id"
        class="resizable-container"
      >
        <vue-resizable-box
          :width="element.props.style.width"
          :height="element.props.style.height"
          :x="element.props.style.left"
          :y="element.props.style.top"
          @resizing="onResizing(index, $event)"
          @dragging="onDragging(index, $event)"
          @drag-stop="onDragStop(index, $event)"
          @resize-stop="onResizeStop(index, $event)"
        >
          <component :is="element.type" v-bind="element.props" />
        </vue-resizable-box>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      elements: [
        {
          id: 1,
          type: 'div',
          props: {
            class: 'box',
            style: {
              width: '20em',
              height: '20em',
              top: '50px',
              left: '50px',
              backgroundColor: 'lightblue',
            },
          },
        },
        {
          id: 2,
          type: 'img',
          props: {
            src: 'image.png',
            alt: 'Image',
            style: {
              width: '200px',
              height: '150px',
              top: '100px',
              left: '100px',
            },
          },
        },
        {
          id: 3,
          type: 'button',
          props: {
            class: 'btn',
            innerText: 'Click me',
            style: {
              width: '100px',
              height: '50px',
              top: '150px',
              left: '150px',
            },
          },
        },
      ],
    }
  },
  methods: {
    onEnd(event) {
      console.log('Drag Ended:', event)
    },
    onResizing(index, event) {
      this.elements[index].props.style.width = event.width + 'px'
      this.elements[index].props.style.height = event.height + 'px'
    },
    onDragging(index, event) {
      this.elements[index].props.style.left = event.left + 'px'
      this.elements[index].props.style.top = event.top + 'px'
    },
    onDragStop(index, event) {
      console.log('Drag Stopped:', event)
    },
    onResizeStop(index, event) {
      console.log('Resize Stopped:', event)
    },
  },
}
</script>

<style>
.canvas {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  position: relative;
}

.resizable-container {
  position: absolute;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background-color: lightblue;
}

.btn {
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
}
</style>
