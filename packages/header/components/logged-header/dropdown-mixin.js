import clickoutside from "../../../common/util/clickoutside";

export default {
  directives: { clickoutside },
  data() {
    return { dropdownVisible: false };
  },
  methods: {
    toggleDropdownVisible(visible = !this.dropdownVisible) {
      this.dropdownVisible = visible;
    },
    handleClickOutside() {
      this.toggleDropdownVisible(false);
    },
  },
};
