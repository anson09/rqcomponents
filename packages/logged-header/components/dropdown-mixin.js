import clickoutside from "../../common/util/clickoutside";

export default {
  directives: { clickoutside },
  data() {
    return { dropdownVisible: false };
  },
  methods: {
    toggleDropdownVisible() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    handleClickOutside() {
      this.dropdownVisible = false;
    },
  },
};
