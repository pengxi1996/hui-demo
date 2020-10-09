let activeRow = null; // 当前焦点行
let mouseLocs = []; // 鼠标位置存储栈
let lastDelayLoc = null; // 存储最近有延时的坐标
let delayTimer = -1; // 存储定时器

let offsetLeft = 0;
let offsetTop = 50 + 40; // Topbar + 默认的工作台
let offsetWidth = 200;
let offsetHeight = 500;

const tolerance = 25;

// top - left
const upperLeft = {
  x: offsetLeft,
  y: offsetTop - tolerance
};

// top - right
const upperRight = {
  x: offsetLeft + offsetWidth,
  y: upperLeft.y
};

// bottom - left
const lowerLeft = {
  x: offsetLeft,
  y: offsetTop + offsetHeight + tolerance
};

// bottom - right
const lowerRight = {
  x: offsetLeft + offsetWidth,
  y: lowerLeft.y
};

export default {
  methods: {
    onMouseMove(e) {
      mouseLocs.push({ x: e.pageX, y: e.pageY });
      if (mouseLocs.length > 3) {
        mouseLocs.shift();
      }
    },
    onMouseLeave(e) {
      if (delayTimer) {
        //清除定时器
        clearTimeout(delayTimer);
      }
      activeRow = null; //当前焦点行清空
    },
    onMouseEnter(sIndex, item) {
      //清理之前的定时器，因为possiblyActivate(this)中会设置定时器
      if (delayTimer) {
        clearTimeout(delayTimer);
      }
      this.possiblyActivate(sIndex, item);
    },
    possiblyActivate(index, row) {
      const delay = activationDelay();
      if (delay) {
        delayTimer = setTimeout(() => {
          this.possiblyActivate(index, row);
        }, delay);
      } else {
        activeRow = row;
        this.showTab(index, row);
      }
    }
  },
  mounted() {
    offsetHeight = this.$refs["MenuDelayTriangleWrapper"].offsetHeight;
  }
};

function activationDelay() {
  //当前没有被激活的行时，直接执行
  if (!activeRow) {
    return 0;
  }

  let loc = mouseLocs[mouseLocs.length - 1]; // 当前坐标
  let prevLoc = mouseLocs[0]; // 前一个坐标

  if (!loc) {
    return 0;
  }

  if (!prevLoc) {
    prevLoc = loc;
  }

  //移除菜单区域
  if (
    prevLoc.x < offsetLeft ||
    prevLoc.x > lowerRight.x ||
    prevLoc.y < offsetTop ||
    prevLoc.y > lowerRight.y
  ) {
    return 0;
  }
  //鼠标在一级菜单相邻行缓慢切换时
  if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
    return 0;
  }

  let decreasingCorner = upperRight, //右上角
    increasingCorner = lowerRight; //左下角

  let decreasingSlope = slope(loc, decreasingCorner),
    increasingSlope = slope(loc, increasingCorner),
    prevDecreasingSlope = slope(prevLoc, decreasingCorner),
    prevIncreasingSlope = slope(prevLoc, increasingCorner);
  if (
    decreasingSlope < prevDecreasingSlope &&
    increasingSlope > prevIncreasingSlope
  ) {
    lastDelayLoc = loc; //记录延迟坐标
    return 300; //返回延迟毫秒数
  }
  lastDelayLoc = null;
  return 0;
}

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}
