class StepWorkflow {
  constructor(steps) {
    this.steps = steps;
    this.currentStepIndex = 0;
  }
  execute() {
    const currentStep = this.steps[this.currentStepIndex];
    currentStep.execute((result) => {
      if (currentStep.condition(result)) {
        this.currentStepIndex++;
        if (this.currentStepIndex < this.steps.length) {
          this.execute();
        } else {
          console.log('All steps executed.');
        }
      } else {
        console.log('Condition not met, stopping workflow.');
      }
    });
  }
}

// 示例步骤定义
const step1 = {
  execute(callback) {
    console.log('Executing step 1...');
    callback('Step 1 result');
  },
  condition(result) {
    return result === 'Step 1 result'; // 根据实际情况修改条件
  }
};

const step2 = {
  execute(callback) {
    console.log('Executing step 2...');
    callback('Step 2 result');
  },
  condition(result) {
    return result === 'Step 2 result'; // 根据实际情况修改条件
  }
};

const step3 = {
  execute(callback) {
    console.log('Executing step 3...');
    callback('Step 3 result');
  },
  condition(result) {
    return result === 'Step 3 result'; // 根据实际情况修改条件
  }
};
  
// 创建工作流程实例并执行
const workflow = new StepWorkflow([step1, step2, step3]);
workflow.execute();