<script>
  import { createEventDispatcher, onMount } from "svelte";
  import RadioContent from "./RadioContent.svelte";
  import CheckContent from "./CheckContent.svelte";
  import Select from "../Select/index.svelte";
  import ContentModal from "../ContentModal/index.svelte";
  import { condition, currentData } from "../../stores";
  import Input from "./Input.svelte";
  const dispatch = createEventDispatcher();

  export let data = [];
  export let key = "";
  export let value = "";

  currentData.update(e => data)

  export function updateValue(cb) {
    cb && typeof cb === 'function' && cb({key, value, data, update: (key, value) => {
      const list = data.find(item => item.key === key)
      list._value = value
      currentData.update(e => {
        e.map(item => {
          if (item.key === key) {
            item._value = value
          }
          return item
        })
        return e
      })
      return currentData
    }})
  }

  const _conditionData = $condition.find(item => item.value === value) || {}
  data.map((item) => {
    const _dataItem = _conditionData?.data?.find(_item => _item.key === item.key) || {}
    const _dataValue = _dataItem?.value

    item._value = _dataValue
  });

  const handleCancel = () => {
    dispatch("cancel");
  };

  const updateCondition = () => {
    condition.update((e) => {
      const hasItem = e.some((item) => item.value === value);
      if (hasItem) {
        e.map((item) => {
          if (item.value === value) {
            const d = [];
            data.forEach((ii) => {
              d.push({
                ...ii,
                value: ii._value || ii.value || undefined,
              });
            });
            item.data = d;
          }
          return item;
        });
      } else {
        const d = [];
        data.forEach((ii) => {
          d.push({
            ...ii,
            value: ii._value || ii.value || undefined,
          });
        });
        e.push({
          key,
          value,
          data: d,
        });
      }
      return e;
    });
  };

  const validateData = () => {
    let validate_list = [];
    let validate_strict = [];
    data.forEach((item) => {
      if (!item._value?.toString()) {
        if (item.validateMsg) {
          validate_list.push(item);
        }
        validate_strict.push(item);
      }
    });
    return {
      validate: validate_list,
      validate_strict,
    };
  };

  const handleConfirm = () => {
    const { validate } = validateData();
    if (validate?.length) {
      window.filterToast.warning(validate[0].validateMsg);
      return false
    } else {
      updateCondition();
    }
    dispatch("confirm", {
      validate: validate?.length == 0,
      key,
      value,
      data,
      validateData: validate,
    });
  };

  const getDefaultValue = (item, local) => {
    const current = $condition.find((ii) => ii.value === value);
    if (current?.key) {
      const _current = current?.data?.find((ii) => ii.key === item.key);
      if (_current) {
        return local ? _current._value : _current.value;
      }
    }
  };
</script>

<ContentModal title={key} on:cancel={handleCancel} on:confirm={handleConfirm}>
  {#each $currentData as item, _index (_index)}
    <div>
      {#if item.type === "radio"}
        <RadioContent
          on:change={(e) => {
            const { value, data } = e.detail;
            item._value = value;
            dispatch('change', item)
          }}
          defaultValue={getDefaultValue(item) || ""}
          radioData={item.data}
        />
      {/if}

      {#if item.type === "check"}
        <CheckContent
          on:change={(e) => {
            const { value, data } = e.detail;
            item._value = value;
            dispatch('change', item)
          }}
          checkData={item.data}
          defaultValue={getDefaultValue(item) || []}
          quickAction={item?.quickAction || {}}
        />
      {/if}

      {#if item.type === "select"}
        <Select
          options={item.data}
          placeholder={item?.placeholder || ""}
          defaultValue={getDefaultValue(item) || ""}
          on:change={(e) => {
            const detail = e.detail;
            item._value = detail.key;
            dispatch('change', item)
          }}
        />
      {/if}

      {#if item.type === "input"}
        <Input
          placeholder={item?.placeholder}
          defaultValue={getDefaultValue(item) || item._value}
          value={item._value}
          on:input={(e) => {
            item._value = e.detail.value;
          }}
        />
      {/if}

    </div>
  {/each}
</ContentModal>

