const { createTool } = require('./generate-curated-tools.cjs');

// Pack 43: 25 Computer Science, Machine Learning, Data Science, Graph Theory & Information Theory Calculators (Tools 1326 to 1350)
const pack43Tools = [
  // 1. Confusion Matrix & Precision-Recall-F1-MCC Calculator
  {
    slug: 'confusion-matrix-precision-recall-f1-score-mcc-calculator',
    name: 'Machine Learning Confusion Matrix (Accuracy, Precision, Recall, F1-Score & MCC) Calculator',
    description: 'Calculate binary classification evaluation metrics from True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN): Accuracy, Precision, Recall (Sensitivity), Specificity, F1-Score, and Matthews Correlation Coefficient (MCC).',
    category: 'Math',
    icon: 'text',
    keywords: ['confusion matrix calculator', 'precision recall f1 score formula online', 'matthews correlation coefficient mcc machine learning calculator', 'sensitivity specificity balanced accuracy calculator', 'data science machine learning classification evaluation online'],
    order: 1210,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'True Positives (TP), False Positives (FP), True Negatives (TN) & False Negatives (FN)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cm-tp">True Pos (TP)</label>
          <input class="tool-textarea" id="cm-tp" type="number" step="5" value="85" placeholder="85" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cm-fp">False Pos (FP)</label>
          <input class="tool-textarea" id="cm-fp" type="number" step="5" value="15" placeholder="15" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cm-tn">True Neg (TN)</label>
          <input class="tool-textarea" id="cm-tn" type="number" step="5" value="880" placeholder="880" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cm-fn">False Neg (FN)</label>
          <input class="tool-textarea" id="cm-fn" type="number" step="5" value="20" placeholder="20" />
        </div>
      </div>
      <div id="cm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cm-res-f1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F1-Score = 0.829 (82.9%)</span>
            <span class="stat-label">Harmonic Mean of Precision & Recall (2·P·R / (P + R))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cm-res-all" style="color:var(--green-dark); font-weight:700;">Accuracy = 96.5% | Precision = 85.0% | Recall = 81.0% | Specificity = 98.3% | MCC = +0.811</span>
            <span class="stat-label">Comprehensive Binary Classification Performance Metrics</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tpEl = document.getElementById('cm-tp'), fpEl = document.getElementById('cm-fp');
  const tnEl = document.getElementById('cm-tn'), fnEl = document.getElementById('cm-fn');
  const f1ResEl = document.getElementById('cm-res-f1'), allResEl = document.getElementById('cm-res-all');

  function update() {
    const TP = parseFloat(tpEl.value), FP = parseFloat(fpEl.value);
    const TN = parseFloat(tnEl.value), FN = parseFloat(fnEl.value);

    if (isNaN(TP) || isNaN(FP) || isNaN(TN) || isNaN(FN) || TP < 0 || FP < 0 || TN < 0 || FN < 0) return;

    const total = TP + FP + TN + FN;
    if (total === 0) return;

    const accuracy = (TP + TN) / total;
    const precision = (TP + FP) > 0 ? TP / (TP + FP) : 0;
    const recall = (TP + FN) > 0 ? TP / (TP + FN) : 0;
    const specificity = (TN + FP) > 0 ? TN / (TN + FP) : 0;

    // F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
    const F1 = (precision + recall) > 0 ? (2.0 * precision * recall) / (precision + recall) : 0;

    // Matthews Correlation Coefficient (MCC) = (TP*TN - FP*FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))
    const num_mcc = (TP * TN) - (FP * FN);
    const den_mcc = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    const MCC = den_mcc > 0 ? num_mcc / den_mcc : 0;

    f1ResEl.textContent = 'F1-Score = ' + F1.toFixed(3) + ' (' + (F1 * 100).toFixed(1) + '%)';
    allResEl.textContent = 'Acc = ' + (accuracy * 100).toFixed(1) + '% | Prec = ' + (precision * 100).toFixed(1) + '% | Rec = ' + (recall * 100).toFixed(1) + '% | Spec = ' + (specificity * 100).toFixed(1) + '% | MCC = ' + (MCC >= 0 ? '+' : '') + MCC.toFixed(3);
  }

  [tpEl, fpEl, tnEl, fnEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw counts for True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN).',
      'Inspect Accuracy, Precision, Recall/Sensitivity, Specificity, F1-Score, and Matthews Correlation Coefficient (MCC).'
    ],
    benefitTitle: 'Binary Classification Evaluation Framework',
    benefitContent: 'Accuracy alone is misleading on imbalanced datasets (e.g. 99% negative fraud); F1-Score and MCC provide robust evaluation of true predictive power.',
    faqs: [{ q: 'Why is Matthews Correlation Coefficient (MCC) considered the most robust single metric?', a: 'MCC evaluates all four quadrants of the confusion matrix symmetrically, yielding values from -1.0 (total disagreement) to +1.0 (perfect prediction).' }]
  },

  // 2. Receiver Operating Characteristic (ROC) Curve & AUC Evaluator
  {
    slug: 'roc-curve-auc-trapezoidal-classification-evaluator',
    name: 'ROC Curve & Area Under the Curve (AUC / c-Statistic) Trapezoidal Evaluator',
    description: 'Calculate classification Receiver Operating Characteristic Area Under the Curve (ROC-AUC / c-statistic) using the numerical trapezoidal rule from True Positive Rate (TPR) and False Positive Rate (FPR) threshold coordinates.',
    category: 'Math',
    icon: 'text',
    keywords: ['roc auc calculator', 'area under curve trapezoidal rule classification calculator', 'c statistic roc curve evaluator machine learning', 'tpr fpr false positive rate roc calculator', 'data science machine learning model evaluation online'],
    order: 1211,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Classification Operating Point (TPR / Sensitivity) & False Positive Rate (FPR = 1 - Specificity)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-tpr">True Positive Rate (TPR)</label>
          <input class="tool-textarea" id="rc-tpr" type="number" step="0.05" min="0" max="1" value="0.88" placeholder="0.88 (88% Sensitivity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-fpr">False Positive Rate (FPR)</label>
          <input class="tool-textarea" id="rc-fpr" type="number" step="0.05" min="0" max="1" value="0.12" placeholder="0.12 (12% FPR)" />
        </div>
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-auc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Estimated AUC = 0.926 (Excellent Classifier)</span>
            <span class="stat-label">Area Under the ROC Curve (c-Statistic)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-youden" style="color:var(--green-dark); font-weight:700;">Youden\'s J Index = 0.760 (TPR - FPR) | Diagnostic Odds Ratio (DOR) = 53.8</span>
            <span class="stat-label">Youden Optimization Index & Diagnostic Odds Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tprEl = document.getElementById('rc-tpr'), fprEl = document.getElementById('rc-fpr');
  const aucResEl = document.getElementById('rc-res-auc'), ydResEl = document.getElementById('rc-res-youden');

  function update() {
    const TPR = parseFloat(tprEl.value), FPR = parseFloat(fprEl.value);
    if (isNaN(TPR) || isNaN(FPR) || TPR < 0 || TPR > 1 || FPR < 0 || FPR > 1) return;

    // Youden's J statistic = TPR - FPR
    const J = TPR - FPR;

    // Bi-trapezoidal AUC approximation through operating point (0,0) -> (FPR, TPR) -> (1,1):
    // AUC = 0.5 * FPR * TPR + 0.5 * (1 - FPR) * (1 + TPR)
    const AUC = 0.5 * (1.0 + TPR - FPR);

    // Diagnostic odds ratio: (TPR / (1 - TPR)) / (FPR / (1 - FPR))
    const DOR = (TPR > 0 && TPR < 1 && FPR > 0 && FPR < 1) ? (TPR / (1.0 - TPR)) / (FPR / (1.0 - FPR)) : 1.0;

    let qual = '', color = '#22543d';
    if (AUC >= 0.90) { qual = 'EXCELLENT CLASSIFIER (AUC 0.90 - 1.00)'; color = '#22543d'; }
    else if (AUC >= 0.80) { qual = 'GOOD DISCRIMINATION (AUC 0.80 - 0.89)'; color = '#22543d'; }
    else if (AUC >= 0.70) { qual = 'FAIR / MODERATE (AUC 0.70 - 0.79)'; color = '#ea580c'; }
    else if (AUC >= 0.50) { qual = 'POOR / RANDOM GUESS (AUC ~0.50)'; color = '#c53030'; }
    else { qual = 'INVERTED PREDICTION (AUC < 0.50)'; color = '#c53030'; }

    aucResEl.textContent = 'Estimated AUC = ' + AUC.toFixed(3) + ' (' + qual.split(' (')[0] + ')';
    aucResEl.style.color = color;
    ydResEl.textContent = 'Youden J = ' + J.toFixed(3) + ' | Diagnostic Odds Ratio = ' + (DOR >= 100 ? Math.round(DOR) : DOR.toFixed(1)) + ' (TPR = ' + TPR + ', FPR = ' + FPR + ')';
  }

  tprEl.addEventListener('input', update);
  fprEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter model True Positive Rate (TPR / Sensitivity) between 0.0 and 1.0.',
      'Enter model False Positive Rate (FPR = 1 - Specificity) between 0.0 and 1.0.',
      'Inspect estimated Area Under the ROC Curve (AUC), Youden\'s J index, and Diagnostic Odds Ratio.'
    ],
    benefitTitle: 'Signal Detection Theory ROC Curve Analysis',
    benefitContent: 'The ROC-AUC measures a classifier\'s ability to rank positive instances higher than negative instances across all possible decision thresholds independent of class prevalence.',
    faqs: [{ q: 'What does an AUC of 0.50 vs 1.00 mean?', a: 'An AUC of 0.50 represents pure random coin-toss guessing, while 1.00 represents a flawless classifier with zero false positives or false negatives.' }]
  },

  // 3. Logistic Regression Sigmoid & Binary Cross-Entropy Loss Calculator
  {
    slug: 'logistic-regression-sigmoid-cross-entropy-loss-calculator',
    name: 'Logistic Regression Sigmoid Activation (σ(z) = 1 / (1 + e^(-z))) & Cross-Entropy Loss Calculator',
    description: 'Calculate logistic regression sigmoid activation probability (σ(z) = 1 / (1 + e^(-z))), log-odds logit transformation, and Binary Cross-Entropy (Log Loss L = -(y·ln(p) + (1 - y)·ln(1 - p))) for machine learning.',
    category: 'Math',
    icon: 'text',
    keywords: ['logistic regression calculator', 'sigmoid activation function formula sigma z online', 'binary cross entropy log loss calculator machine learning', 'logit log odds probability calculator', 'machine learning data science deep learning activation online'],
    order: 1212,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Linear Logit Score z = w·x + b & Ground Truth True Class Label y (0 or 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lr-z">Logit Score z</label>
          <input class="tool-textarea" id="lr-z" type="number" step="0.5" value="2.20" placeholder="2.20 (Linear Output)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lr-y">True Label y</label>
          <select class="tool-textarea" id="lr-y">
            <option value="1" selected>Class 1 (Positive Instance: y = 1)</option>
            <option value="0">Class 0 (Negative Instance: y = 0)</option>
          </select>
        </div>
      </div>
      <div id="lr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lr-res-prob" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Probability p = 0.900 (90.0%)</span>
            <span class="stat-label">Sigmoid Output Probability (σ(z) = 1 / (1 + e^(-z)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lr-res-loss" style="color:var(--green-dark); font-weight:700;">Log Loss ℒ = 0.105 | Odds = 9.02:1 | Gradient dℒ/dz = -0.0997 (p - y)</span>
            <span class="stat-label">Binary Cross-Entropy Loss & Backpropagation Gradient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('lr-z'), yEl = document.getElementById('lr-y');
  const prResEl = document.getElementById('lr-res-prob'), lsResEl = document.getElementById('lr-res-loss');

  function update() {
    const z = parseFloat(zEl.value), y = parseFloat(yEl.value);
    if (isNaN(z) || isNaN(y)) return;

    // Sigmoid function: p = 1 / (1 + exp(-z))
    const p = 1.0 / (1.0 + Math.exp(-z));

    // Odds = p / (1 - p) = exp(z)
    const odds = Math.exp(z);

    // Binary cross-entropy loss: L = -( y * ln(p) + (1-y) * ln(1-p) )
    const eps = 1e-15;
    const p_safe = Math.max(eps, Math.min(1.0 - eps, p));
    const loss = -( (y * Math.log(p_safe)) + ((1.0 - y) * Math.log(1.0 - p_safe)) );

    // Derivative dL/dz = p - y
    const grad = p - y;

    prResEl.textContent = 'Probability p = ' + p.toFixed(4) + ' (' + (p * 100).toFixed(2) + '%)';
    lsResEl.textContent = 'Log Loss ℒ = ' + loss.toFixed(4) + ' | Odds = ' + odds.toFixed(2) + ':1 | Gradient dℒ/dz = ' + (grad >= 0 ? '+' : '') + grad.toFixed(4) + ' (y = ' + y + ')';
  }

  zEl.addEventListener('input', update);
  yEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter raw linear logit score $z = \mathbf{w}^T \mathbf{x} + b$.',
      'Select ground-truth binary class label ($y=1$ or $y=0$).',
      'Inspect sigmoid probability $\sigma(z)$, Binary Cross-Entropy log loss ($\mathcal{L}$), and backpropagation gradient ($p - y$).'
    ],
    benefitTitle: 'Maximum Likelihood Logistic Regression Optimization',
    benefitContent: 'Combining the sigmoid activation with binary cross-entropy loss creates a convex optimization landscape whose gradient simplifies elegantly to $\frac{\partial \mathcal{L}}{\partial z} = p - y$.',
    faqs: [{ q: 'What is the logit function?', a: 'The logit function is the inverse of the sigmoid: $\text{logit}(p) = \ln(\frac{p}{1-p}) = z$, converting probabilities $[0, 1]$ into unconstrained real numbers $(-\infty, +\infty)$.' }]
  },

  // 4. Decision Tree Gini Impurity & Information Gain Calculator
  {
    slug: 'decision-tree-gini-impurity-information-gain-calculator',
    name: 'Decision Tree Gini Impurity (I_G = 1 - ∑ p_i²) & Information Gain Entropy Calculator',
    description: 'Calculate CART Decision Tree Gini Impurity (I_G = 1 - ∑ p_i²), Shannon Entropy (H(D) = -∑ p_i·log₂(p_i)), and Information Gain split quality for decision tree algorithms (ID3, C4.5, Random Forest).',
    category: 'Math',
    icon: 'text',
    keywords: ['gini impurity calculator', 'information gain decision tree formula online', 'shannon entropy id3 c4.5 cart calculator', 'decision tree split purity calculator machine learning', 'data science decision trees random forest online'],
    order: 1213,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Positive Class Samples (n₁) & Negative Class Samples (n₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dt-n1">Class 1 Count (n₁)</label>
          <input class="tool-textarea" id="dt-n1" type="number" step="5" value="45" placeholder="45 (Positive)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dt-n2">Class 2 Count (n₂)</label>
          <input class="tool-textarea" id="dt-n2" type="number" step="5" value="15" placeholder="15 (Negative)" />
        </div>
      </div>
      <div id="dt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dt-res-gini" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gini Impurity I_G = 0.375</span>
            <span class="stat-label">CART Gini Node Impurity (I_G = 1 - (p₁² + p₂²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dt-res-ent" style="color:var(--green-dark); font-weight:700;">Shannon Entropy H = 0.811 Bits | Probabilities: p₁ = 75.0%, p₂ = 25.0%</span>
            <span class="stat-label">Information Theory Entropy & Class Probability Distribution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('dt-n1'), n2El = document.getElementById('dt-n2');
  const gnResEl = document.getElementById('dt-res-gini'), enResEl = document.getElementById('dt-res-ent');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || (n1 + n2) === 0) return;

    const total = n1 + n2;
    const p1 = n1 / total;
    const p2 = n2 / total;

    // Gini Impurity: I_G = 1 - (p1^2 + p2^2)
    const gini = 1.0 - (Math.pow(p1, 2) + Math.pow(p2, 2));

    // Shannon Entropy: H = -( p1 * log2(p1) + p2 * log2(p2) )
    let entropy = 0;
    if (p1 > 0) entropy -= p1 * (Math.log(p1) / Math.log(2.0));
    if (p2 > 0) entropy -= p2 * (Math.log(p2) / Math.log(2.0));

    gnResEl.textContent = 'Gini Impurity I_G = ' + gini.toFixed(3);
    enResEl.textContent = 'Shannon Entropy H = ' + entropy.toFixed(3) + ' Bits | p₁ = ' + (p1 * 100).toFixed(1) + '%, p₂ = ' + (p2 * 100).toFixed(1) + '% (Total: ' + total + ' samples)';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter count of samples in Class 1 ($n_1$) and Class 2 ($n_2$).',
      'Inspect CART Gini Impurity ($I_G \in [0, 0.5]$) and Shannon Entropy in bits ($H \in [0, 1]$).'
    ],
    benefitTitle: 'Decision Tree Purity Splitting Criteria',
    benefitContent: 'Decision tree algorithms choose the feature split that maximizes Gini Impurity reduction ($\Delta I_G$) or Information Gain ($\Delta H$), driving nodes toward pure single-class leaf predictions.',
    faqs: [{ q: 'What is the maximum Gini impurity for a binary classification node?', a: 'Maximum binary Gini impurity is 0.500 (and maximum entropy is 1.000 bit), occurring at a 50/50 balanced split.' }]
  },

  // 5. Cosine Similarity & Angular Distance Vector Calculator
  {
    slug: 'cosine-similarity-and-angular-distance-vector-calculator',
    name: 'Vector Cosine Similarity (cos θ = u·v / (‖u‖·‖v‖)) & Angular Distance Calculator',
    description: 'Calculate high-dimensional vector Cosine Similarity (cos θ = u · v / (‖u‖ · ‖v‖)), Cosine Distance (1 - cos θ), Euclidean distance, and Angular Distance (θ in degrees) for NLP embeddings and vector databases (Pinecone, Chroma).',
    category: 'Math',
    icon: 'text',
    keywords: ['cosine similarity calculator', 'vector cosine similarity formula dot product online', 'cosine distance angular distance embeddings calculator', 'vector database search cosine similarity calculator', 'nlp machine learning embeddings similarity online'],
    order: 1214,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vector u & Vector v Coordinates (Comma-Separated Numbers, e.g. 1, 2, 3)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cs-u">Vector u</label>
          <input class="tool-textarea" id="cs-u" type="text" value="3, 8, 7, 5, 2" placeholder="3, 8, 7, 5, 2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-v">Vector v</label>
          <input class="tool-textarea" id="cs-v" type="text" value="2, 9, 6, 6, 1" placeholder="2, 9, 6, 6, 1" />
        </div>
      </div>
      <div id="cs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cs-res-cos" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cosine Similarity = 0.9912 (Near-Identical Direction)</span>
            <span class="stat-label">Vector Dot Product Normalization (cos θ = u·v / ‖u‖·‖v‖)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cs-res-ang" style="color:var(--green-dark); font-weight:700;">Angular Angle θ = 7.61° | Cosine Distance = 0.0088 | Euclidean L₂ Distance = 2.000</span>
            <span class="stat-label">Angular Separation, Cosine Distance & Euclidean Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('cs-u'), vEl = document.getElementById('cs-v');
  const cosResEl = document.getElementById('cs-res-cos'), angResEl = document.getElementById('cs-res-ang');

  function update() {
    const uStr = uEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const vStr = vEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (uStr.length === 0 || vStr.length === 0 || uStr.length !== vStr.length) return;

    let dot = 0, normU_sq = 0, normV_sq = 0, euc_sq = 0;
    for (let i = 0; i < uStr.length; i++) {
      dot += uStr[i] * vStr[i];
      normU_sq += Math.pow(uStr[i], 2);
      normV_sq += Math.pow(vStr[i], 2);
      euc_sq += Math.pow(uStr[i] - vStr[i], 2);
    }

    const normU = Math.sqrt(normU_sq);
    const normV = Math.sqrt(normV_sq);
    if (normU === 0 || normV === 0) return;

    // Cosine similarity: cos_theta = dot / (normU * normV)
    let cos_theta = dot / (normU * normV);
    cos_theta = Math.max(-1.0, Math.min(1.0, cos_theta));

    const cos_dist = 1.0 - cos_theta;
    const theta_rad = Math.acos(cos_theta);
    const theta_deg = (theta_rad * 180.0) / Math.PI;
    const euc_dist = Math.sqrt(euc_sq);

    cosResEl.textContent = 'Cosine Similarity = ' + cos_theta.toFixed(4);
    angResEl.textContent = 'Angle θ = ' + theta_deg.toFixed(2) + '° | Cosine Distance = ' + cos_dist.toFixed(4) + ' | Euclidean Distance = ' + euc_dist.toFixed(3) + ' (' + uStr.length + '-D vectors)';
  }

  uEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated numerical coordinates for Vector u and Vector v.',
      'Inspect normalized Cosine Similarity ($-1.0$ to $+1.0$), angular orientation angle $\theta$ in degrees, and Euclidean $L_2$ distance.'
    ],
    benefitTitle: 'Vector Semantic Similarity & Retrieval Augmented Generation (RAG)',
    benefitContent: 'Cosine similarity measures directional orientation rather than vector magnitude, making it invariant to document length in Large Language Model (LLM) vector embeddings (OpenAI, BERT).',
    faqs: [{ q: 'Why is cosine distance preferred over Euclidean distance for text embeddings?', a: 'A short paragraph and a long article on the same topic have different vector magnitudes but point in nearly identical directions in semantic space.' }]
  },

  // 6. TF-IDF Term Frequency-Inverse Document Frequency Calculator
  {
    slug: 'tf-idf-term-frequency-inverse-document-frequency-calculator',
    name: 'TF-IDF (Term Frequency-Inverse Document Frequency TF·ln(N / DF)) Calculator',
    description: 'Calculate natural language processing TF-IDF keyword importance weighting (TF-IDF = Term Frequency · ln(Total Documents / Document Frequency)) for search engine ranking and document classification.',
    category: 'Math',
    icon: 'text',
    keywords: ['tf idf calculator', 'term frequency inverse document frequency formula online', 'nlp tf idf keyword weighting calculator', 'search engine information retrieval tf idf calculator', 'natural language processing text mining online'],
    order: 1215,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Term Frequency TF (or count in doc), Total Corpus Docs N & Document Frequency DF',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tf-tf">Term Count (TF)</label>
          <input class="tool-textarea" id="tf-tf" type="number" step="1" value="5" placeholder="5 occurrences" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tf-words">Doc Words</label>
          <input class="tool-textarea" id="tf-words" type="number" step="50" value="250" placeholder="250 words total" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tf-n">Corpus Docs N</label>
          <input class="tool-textarea" id="tf-n" type="number" step="1000" value="10000" placeholder="10,000 Documents" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tf-df">Doc Freq (DF)</label>
          <input class="tool-textarea" id="tf-df" type="number" step="10" value="25" placeholder="25 Docs contain word" />
        </div>
      </div>
      <div id="tf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tf-res-tfidf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">TF-IDF Weight = 0.1198 (High Relevance Keyword)</span>
            <span class="stat-label">Calculated TF-IDF Feature Weight (TF · ln(N / DF))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tf-res-details" style="color:var(--green-dark); font-weight:700;">Term Frequency TF = 0.0200 (2.0%) | Inverse Document Frequency IDF = 5.991</span>
            <span class="stat-label">Normalized Term Frequency & Logarithmic Specificity Index</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tfEl = document.getElementById('tf-tf'), wdEl = document.getElementById('tf-words');
  const nEl = document.getElementById('tf-n'), dfEl = document.getElementById('tf-df');
  const tiResEl = document.getElementById('tf-res-tfidf'), dtResEl = document.getElementById('tf-res-details');

  function update() {
    const termCount = parseFloat(tfEl.value), totalWords = parseFloat(wdEl.value);
    const N = parseFloat(nEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(termCount) || isNaN(totalWords) || isNaN(N) || isNaN(DF) || termCount < 0 || totalWords <= 0 || N <= 0 || DF <= 0 || DF > N) return;

    // Normalized Term Frequency: TF = count / total_words
    const TF = termCount / totalWords;

    // Inverse Document Frequency: IDF = ln( N / DF )
    const IDF = Math.log(N / DF);

    // TF-IDF = TF * IDF
    const TF_IDF = TF * IDF;

    tiResEl.textContent = 'TF-IDF Weight = ' + TF_IDF.toFixed(4);
    dtResEl.textContent = 'TF = ' + TF.toFixed(4) + ' (' + (TF * 100).toFixed(2) + '%) | IDF = ' + IDF.toFixed(3) + ' (Present in ' + DF + ' of ' + N.toLocaleString() + ' docs)';
  }

  [tfEl, wdEl, nEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter term count in current document and total document word count.',
      'Enter total number of documents in corpus N.',
      'Enter number of corpus documents containing the term (Document Frequency DF).',
      'Inspect normalized Term Frequency (TF), Inverse Document Frequency (IDF), and final TF-IDF relevance score.'
    ],
    benefitTitle: 'Karen Spärck Jones 1972 Information Retrieval Standard',
    benefitContent: 'TF-IDF offsets common stop words ("the", "is") by penalizing high document frequency while rewarding rare, domain-specific keywords.',
    faqs: [{ q: 'Why is the logarithm used in the IDF formula?', a: 'Logarithms dampen the effect of corpus size and provide linear scaling for term rarity.' }]
  },

  // 7. Softmax Activation Function & Multi-Class Cross-Entropy Calculator
  {
    slug: 'softmax-activation-function-cross-entropy-loss-calculator',
    name: 'Softmax Activation Function (σ(z)_i = e^(z_i) / ∑ e^(z_j)) & Multi-Class Loss Calculator',
    description: 'Calculate multi-class neural network Softmax probability distribution (σ(z)_i = e^(z_i) / ∑ e^(z_j)), categorical cross-entropy loss, and temperature-scaled Boltzmann probabilities.',
    category: 'Math',
    icon: 'text',
    keywords: ['softmax calculator', 'softmax activation function formula online', 'categorical cross entropy loss neural network calculator', 'temperature scaling softmax boltzmann calculator', 'deep learning machine learning neural networks online'],
    order: 1216,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Logit Scores z₁, z₂, z₃, z₄ (Comma-Separated) & True Class Index (1 to K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sm-logits">Logits (z₁, z₂, z₃, z₄)</label>
          <input class="tool-textarea" id="sm-logits" type="text" value="2.0, 1.0, 0.1, 3.0" placeholder="2.0, 1.0, 0.1, 3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-true">Target Class (1-based)</label>
          <input class="tool-textarea" id="sm-true" type="number" step="1" min="1" value="4" placeholder="4 (Class 4 is Target)" />
        </div>
      </div>
      <div id="sm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sm-res-probs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P = [23.8%, 8.7%, 3.5%, 64.0%]</span>
            <span class="stat-label">Softmax Normalized Probability Distribution (∑ P_i = 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sm-res-loss" style="color:var(--green-dark); font-weight:700;">Cross-Entropy Loss ℒ = 0.446 | Target Class 4 Prob = 64.0%</span>
            <span class="stat-label">Categorical Cross-Entropy Loss (-ln(P_target))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lgEl = document.getElementById('sm-logits'), trEl = document.getElementById('sm-true');
  const pbResEl = document.getElementById('sm-res-probs'), lsResEl = document.getElementById('sm-res-loss');

  function update() {
    const logits = lgEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const targetIdx = parseInt(trEl.value, 10) - 1; // 0-based

    if (logits.length < 2 || targetIdx < 0 || targetIdx >= logits.length) return;

    // Numerically stable softmax: subtract max(z)
    const max_z = Math.max(...logits);
    const exp_z = logits.map(z => Math.exp(z - max_z));
    const sum_exp = exp_z.reduce((a, b) => a + b, 0);

    const probs = exp_z.map(e => e / sum_exp);
    const target_prob = probs[targetIdx];

    // Cross entropy loss = -ln(target_prob)
    const loss = -Math.log(Math.max(1e-15, target_prob));

    const probStr = probs.map(p => (p * 100).toFixed(1) + '%').join(', ');

    pbResEl.textContent = 'P = [' + probStr + ']';
    lsResEl.textContent = 'Cross-Entropy ℒ = ' + loss.toFixed(3) + ' | Target Class ' + (targetIdx + 1) + ' Prob = ' + (target_prob * 100).toFixed(1) + '%';
  }

  lgEl.addEventListener('input', update);
  trEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated raw neural network output logit scores.',
      'Enter 1-based index of the true target class.',
      'Inspect normalized Softmax probability distribution and categorical cross-entropy loss.'
    ],
    benefitTitle: 'Multi-Class Probability Normalization',
    benefitContent: 'Softmax exponentiates logits so larger values dominate exponentially while constraining output sum strictly to 1.0, serving as the standard final layer of classification neural networks (ResNet, Vision Transformers).',
    faqs: [{ q: 'Why is max(z) subtracted during Softmax computation?', a: 'Subtracting $\max(z)$ prevents floating-point exponential overflow ($e^{z}$) without altering output probabilities.' }]
  },

  // 8. K-Nearest Neighbors (KNN) Distance & Majority Vote Classifier
  {
    slug: 'k-nearest-neighbors-knn-distance-classifier-calculator',
    name: 'K-Nearest Neighbors (KNN Euclidean Distance & Majority Voting) Classifier',
    description: 'Calculate multi-dimensional Euclidean distances (d = √(∑ (x_i - y_i)²)) between query point and training data, rank nearest neighbors, and determine majority vote classification label.',
    category: 'Math',
    icon: 'text',
    keywords: ['knn calculator', 'k nearest neighbors algorithm distance formula online', 'euclidean distance knn majority voting calculator', 'lazy learning knn classification calculator', 'machine learning data science knn classifier online'],
    order: 1217,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Query Point Coordinates (x₁, x₂) & K Value (Number of Neighbors, e.g. K = 3)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kn-q">Query Point (x, y)</label>
          <input class="tool-textarea" id="kn-q" type="text" value="3.0, 4.0" placeholder="3.0, 4.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kn-k">K Neighbors</label>
          <input class="tool-textarea" id="kn-k" type="number" step="2" min="1" max="5" value="3" placeholder="3" />
        </div>
      </div>
      <div id="kn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kn-res-class" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Class Predicted: RED (Vote: 2 Red / 1 Blue)</span>
            <span class="stat-label">KNN Majority Voting Classification Result</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kn-res-dist" style="color:var(--green-dark); font-weight:700;">Nearest 3: (2,3) Red d=1.41 | (3,5) Red d=1.00 | (5,4) Blue d=2.00</span>
            <span class="stat-label">K-Nearest Neighbors Ranked by Euclidean Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('kn-q'), kEl = document.getElementById('kn-k');
  const clResEl = document.getElementById('kn-res-class'), dsResEl = document.getElementById('kn-res-dist');

  // Hardcoded training sample set: [x, y, label]
  const trainData = [
    [1.0, 2.0, 'Red'],
    [2.0, 3.0, 'Red'],
    [3.0, 5.0, 'Red'],
    [5.0, 4.0, 'Blue'],
    [6.0, 6.0, 'Blue'],
    [7.0, 5.0, 'Blue']
  ];

  function update() {
    const qParts = qEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const K = parseInt(kEl.value, 10);

    if (qParts.length < 2 || isNaN(K) || K < 1) return;

    const qx = qParts[0], qy = qParts[1];

    // Compute Euclidean distance to all training points:
    const distances = trainData.map(pt => {
      const d = Math.sqrt(Math.pow(qx - pt[0], 2) + Math.pow(qy - pt[1], 2));
      return { pt: pt, dist: d, label: pt[2] };
    });

    distances.sort((a, b) => a.dist - b.dist);
    const kNearest = distances.slice(0, K);

    let redVotes = 0, blueVotes = 0;
    kNearest.forEach(n => {
      if (n.label === 'Red') redVotes++;
      else blueVotes++;
    });

    const winner = redVotes >= blueVotes ? 'RED' : 'BLUE';
    const desc = kNearest.map(n => '(' + n.pt[0] + ',' + n.pt[1] + ') ' + n.label + ' d=' + n.dist.toFixed(2)).join(' | ');

    clResEl.textContent = 'Class: ' + winner + ' (' + redVotes + ' Red / ' + blueVotes + ' Blue votes)';
    dsResEl.textContent = 'Nearest ' + K + ': ' + desc;
  }

  qEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter query coordinates (x, y).',
      'Select number of nearest neighbors K (typically an odd number like 3 or 5 to avoid ties).',
      'Inspect nearest training neighbors and majority vote class assignment.'
    ],
    benefitTitle: 'Instance-Based Lazy Learning Paradigm',
    benefitContent: 'KNN makes zero parametric assumptions about data distribution, classifying new instances purely based on proximity to labeled training examples in feature space.',
    faqs: [{ q: 'Why is feature scaling (StandardScaler) essential for KNN?', a: 'Features with large numerical ranges (e.g. income) dominate Euclidean distance calculations over small-scale features (e.g. age) unless standardized.' }]
  },

  // 9. Convolutional Neural Network (CNN) Output Dimension Calculator
  {
    slug: 'convolutional-neural-network-cnn-output-dimension-calculator',
    name: 'CNN Layer Output Dimension (O = ⌊(W - K + 2P) / S⌋ + 1) & Parameter Count Calculator',
    description: 'Calculate 2D Convolutional Neural Network (CNN) layer output spatial feature map dimensions (O = ⌊(W - K + 2P)/S⌋ + 1), total trainable parameter weights, and MAC floating-point operations.',
    category: 'Math',
    icon: 'text',
    keywords: ['cnn output size calculator', 'convolutional layer dimension formula online', 'cnn padding stride kernel size calculator', 'cnn layer parameter count calculator deep learning', 'deep learning computer vision neural networks online'],
    order: 1218,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Width W (px), Filter Kernel Size K, Padding P, Stride S & Input/Output Channels (C_in, C_out)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cn-w">Input W (px)</label>
          <input class="tool-textarea" id="cn-w" type="number" step="32" value="224" placeholder="224 (ImageNet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cn-k">Kernel K</label>
          <input class="tool-textarea" id="cn-k" type="number" step="2" value="3" placeholder="3 (3×3 Conv)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cn-p">Padding P</label>
          <input class="tool-textarea" id="cn-p" type="number" step="1" value="1" placeholder="1 (Same Padding)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cn-s">Stride S</label>
          <input class="tool-textarea" id="cn-s" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cn-cin">C_in</label>
          <input class="tool-textarea" id="cn-cin" type="number" step="16" value="64" placeholder="64 Channels" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cn-cout">C_out</label>
          <input class="tool-textarea" id="cn-cout" type="number" step="32" value="128" placeholder="128 Filters" />
        </div>
      </div>
      <div id="cn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cn-res-out" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Output Map = 224 × 224 × 128</span>
            <span class="stat-label">Output Feature Map Spatial Tensor Dimensions</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cn-res-param" style="color:var(--green-dark); font-weight:700;">Trainable Parameters = 73,856 Weights (3×3×64×128 + 128 biases) | FLOPs = 3.71 GFLOPs</span>
            <span class="stat-label">Total Layer Parameters & Computational Complexity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('cn-w'), kEl = document.getElementById('cn-k');
  const pEl = document.getElementById('cn-p'), sEl = document.getElementById('cn-s');
  const cinEl = document.getElementById('cn-cin'), coutEl = document.getElementById('cn-cout');
  const otResEl = document.getElementById('cn-res-out'), prResEl = document.getElementById('cn-res-param');

  function update() {
    const W = parseFloat(wEl.value), K = parseFloat(kEl.value);
    const P = parseFloat(pEl.value), S = parseFloat(sEl.value);
    const Cin = parseFloat(cinEl.value), Cout = parseFloat(coutEl.value);

    if (isNaN(W) || isNaN(K) || isNaN(P) || isNaN(S) || isNaN(Cin) || isNaN(Cout) || W <= 0 || K <= 0 || S <= 0 || Cin <= 0 || Cout <= 0) return;

    // Output dimension formula: O = floor( (W - K + 2*P) / S ) + 1
    const O = Math.floor((W - K + (2.0 * P)) / S) + 1;

    // Trainable parameters = ( K * K * Cin * Cout ) + Cout (biases)
    const weights = K * K * Cin * Cout;
    const biases = Cout;
    const totalParams = weights + biases;

    // Total Multiply-Accumulate operations (MACs) approx = O * O * K * K * Cin * Cout
    const MACs = O * O * weights;
    const GFLOPs = (2.0 * MACs) / 1e9;

    otResEl.textContent = 'Output Map = ' + O + ' × ' + O + ' × ' + Cout;
    prResEl.textContent = 'Parameters = ' + totalParams.toLocaleString() + ' Weights (' + (totalParams/1000).toFixed(1) + 'k) | Computation ≈ ' + GFLOPs.toFixed(2) + ' GFLOPs';
  }

  [wEl, kEl, pEl, sEl, cinEl, coutEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter input image/feature map spatial dimension W in pixels.',
      'Enter convolution kernel filter size K (e.g. 3 for a 3x3 filter).',
      'Enter zero-padding P and convolution stride S.',
      'Enter input channels $C_{\text{in}}$ and output filter channels $C_{\text{out}}$.',
      'Inspect output tensor dimensions, trainable parameter weight count, and computational FLOPs.'
    ],
    benefitTitle: 'Convolutional Weight Sharing & Translation Invariance',
    benefitContent: 'Convolutional layers reuse small spatial kernels across the entire image, drastically reducing parameter count compared to fully connected layers while capturing spatial hierarchical features.',
    faqs: [{ q: 'What is Same Padding in deep learning?', a: 'Same padding ($P = (K - 1) / 2$ with stride $S=1$) preserves the exact input spatial resolution in the output ($O = W$).' }]
  },

  // 10. Principal Component Analysis (PCA) Explained Variance Ratio Calculator
  {
    slug: 'principal-component-analysis-pca-explained-variance-ratio-calculator',
    name: 'PCA Explained Variance Ratio (EVR_i = λ_i / ∑ λ_j) & Scree Plot Calculator',
    description: 'Calculate Principal Component Analysis (PCA) eigenvalue explained variance ratio (EVR), cumulative explained variance percentage, and optimal dimensionality reduction retention threshold.',
    category: 'Math',
    icon: 'text',
    keywords: ['pca calculator', 'explained variance ratio formula pca eigenvalues online', 'principal component analysis scree plot calculator', 'dimensionality reduction pca variance retained calculator', 'machine learning unsupervised learning pca online'],
    order: 1219,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Covariance Matrix Eigenvalues λ₁, λ₂, λ₃, λ₄, λ₅ (Comma-Separated Descending)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="pc-eigen">Eigenvalues (λ₁, λ₂, λ₃, λ₄, λ₅)</label>
        <input class="tool-textarea" id="pc-eigen" type="text" value="4.2, 2.1, 0.8, 0.3, 0.1" placeholder="4.2, 2.1, 0.8, 0.3, 0.1" />
      </div>
      <div id="pc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pc-res-evr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Top 2 PCs Retain 84.0% Total Variance</span>
            <span class="stat-label">Cumulative Explained Variance Ratio (EVR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pc-res-pcs" style="color:var(--green-dark); font-weight:700;">PC1: 56.0% (λ=4.2) | PC2: 28.0% (λ=2.1) | PC3: 10.7% | PC4: 4.0% | PC5: 1.3%</span>
            <span class="stat-label">Individual Principal Component Variance Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const egEl = document.getElementById('pc-eigen');
  const evResEl = document.getElementById('pc-res-evr'), pcResEl = document.getElementById('pc-res-pcs');

  function update() {
    const lambdas = egEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n >= 0);
    if (lambdas.length === 0) return;

    const totalVar = lambdas.reduce((a, b) => a + b, 0);
    if (totalVar === 0) return;

    const evrs = lambdas.map(l => l / totalVar);

    // Cumulative 2 PCs:
    const cum2 = (evrs[0] + (evrs.length > 1 ? evrs[1] : 0)) * 100.0;

    const desc = evrs.map((e, idx) => 'PC' + (idx+1) + ': ' + (e*100).toFixed(1) + '% (λ=' + lambdas[idx] + ')').join(' | ');

    evResEl.textContent = 'Top 2 PCs Retain ' + cum2.toFixed(1) + '% Total Variance';
    pcResEl.textContent = desc;
  }

  egEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter covariance/correlation matrix eigenvalues $\lambda_i$ in descending order.',
      'Inspect individual Explained Variance Ratio ($EVR_i = \lambda_i / \sum \lambda$) and cumulative variance retained.'
    ],
    benefitTitle: 'Karl Pearson 1901 Linear Dimensionality Reduction',
    benefitContent: 'PCA projects high-dimensional data along orthogonal eigenvectors of maximum variance, compressing hundreds of correlated features into 2 or 3 principal components with minimal information loss.',
    faqs: [{ q: 'What is the standard cumulative variance threshold for PCA?', a: 'Common rules of thumb retain enough principal components to capture $80\%\text{ to }95\%$ of total dataset variance.' }]
  },

  // 11. K-Means Clustering Inertia (Elbow Method) Calculator
  {
    slug: 'k-means-clustering-inertia-elbow-silhouette-calculator',
    name: 'K-Means Clustering Within-Cluster Sum of Squares (WCSS / Inertia) Calculator',
    description: 'Calculate K-Means clustering Within-Cluster Sum of Squares (WCSS Inertia = ∑ ‖x_i - μ_k‖²) and determine optimal cluster count K using the Elbow Method heuristic.',
    category: 'Math',
    icon: 'text',
    keywords: ['kmeans inertia calculator', 'elbow method k means wcss formula online', 'within cluster sum of squares clustering calculator', 'optimal number of clusters k means calculator', 'unsupervised machine learning clustering online'],
    order: 1220,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inertia (WCSS) Values for K = 1, 2, 3, 4, 5 (Comma-Separated Decreasing)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="km-wcss">WCSS Values (K=1, 2, 3, 4, 5)</label>
        <input class="tool-textarea" id="km-wcss" type="text" value="2500, 1100, 350, 280, 240" placeholder="2500, 1100, 350, 280, 240" />
      </div>
      <div id="km-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="km-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Optimal K = 3 (Elbow Point Detected)</span>
            <span class="stat-label">Optimal Cluster Count (Maximum 2nd Derivative Drop)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="km-res-drops" style="color:var(--green-dark); font-weight:700;">Drops: K1→K2: -1400 (56.0%) | K2→K3: -750 (68.2%) | K3→K4: -70 (Elbow stabilizes)</span>
            <span class="stat-label">Inertia Reduction Rate & Diminishing Returns Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wcEl = document.getElementById('km-wcss');
  const kResEl = document.getElementById('km-res-k'), dpResEl = document.getElementById('km-res-drops');

  function update() {
    const wcss = wcEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (wcss.length < 3) return;

    // Differences:
    const diffs = [];
    for (let i = 0; i < wcss.length - 1; i++) {
      diffs.push(wcss[i] - wcss[i+1]);
    }

    // Second differences (acceleration drop):
    const diff2 = [];
    for (let i = 0; i < diffs.length - 1; i++) {
      diff2.push(diffs[i] - diffs[i+1]);
    }

    let maxIdx = 0, maxVal = -Infinity;
    for (let i = 0; i < diff2.length; i++) {
      if (diff2[i] > maxVal) {
        maxVal = diff2[i];
        maxIdx = i;
      }
    }

    const optimalK = maxIdx + 2; // K is 1-based, second diff at index i corresponds to K = i + 2

    const dropsDesc = diffs.map((d, idx) => 'K' + (idx+1) + '→K' + (idx+2) + ': -' + Math.round(d)).join(' | ');

    kResEl.textContent = 'Optimal K = ' + optimalK + ' (Elbow Point)';
    dpResEl.textContent = dropsDesc + ' (Inertia K=' + optimalK + ': ' + wcss[optimalK - 1] + ')';
  }

  wcEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated WCSS (Inertia) values for successive cluster counts $K = 1, 2, 3, \dots$.',
      'Inspect detected Elbow point where incremental inertia reduction levels off.'
    ],
    benefitTitle: 'Elbow Heuristic in Unsupervised Partitioning',
    benefitContent: 'Identifies the point of diminishing returns where adding further clusters fails to provide meaningful within-cluster variance reduction.',
    faqs: [{ q: 'What is the Silhouette Score alternative to the Elbow Method?', a: 'The Silhouette Score measures how similar a sample is to its own cluster compared to other clusters, peaking at the optimal cluster count without subjective elbow curve interpretation.' }]
  },

  // 12. Gradient Descent Learning Rate & Momentum Update Calculator
  {
    slug: 'gradient-descent-learning-rate-convergence-optimizer-calculator',
    name: 'Gradient Descent Optimization Step (w_{t+1} = w_t - η·∇L + γ·v_t) Calculator',
    description: 'Calculate gradient descent parameter weight update step sizes (w_{t+1} = w_t - η · ∇L), Polyak Momentum velocity updates (v_{t+1} = γ · v_t + η · ∇L), and Adam first/second moment estimates.',
    category: 'Math',
    icon: 'text',
    keywords: ['gradient descent calculator', 'learning rate weight update formula online', 'momentum gradient descent optimizer calculator', 'adam optimizer step size calculator machine learning', 'deep learning numerical optimization online'],
    order: 1221,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current Weight w_t, Loss Gradient ∇L, Learning Rate η & Momentum γ (0 to 0.99)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gd-w">Current Weight w_t</label>
          <input class="tool-textarea" id="gd-w" type="number" step="0.5" value="5.00" placeholder="5.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-grad">Gradient ∇L</label>
          <input class="tool-textarea" id="gd-grad" type="number" step="0.5" value="3.50" placeholder="3.50 (Positive slope)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-eta">Learning Rate η</label>
          <input class="tool-textarea" id="gd-eta" type="number" step="0.01" value="0.10" placeholder="0.10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-gamma">Momentum γ</label>
          <input class="tool-textarea" id="gd-gamma" type="number" step="0.1" max="0.99" value="0.90" placeholder="0.90" />
        </div>
      </div>
      <div id="gd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gd-res-sgd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Vanilla SGD: w_{t+1} = 4.650 (Δw = -0.350)</span>
            <span class="stat-label">Standard Gradient Descent Step (w - η · ∇L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gd-res-mom" style="color:var(--green-dark); font-weight:700;">Momentum Step: w_{t+1} = 4.300 | Effective Step = 2.0× Larger (Accelerates through ravines)</span>
            <span class="stat-label">Polyak Momentum Accelerated Update</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('gd-w'), grEl = document.getElementById('gd-grad');
  const etEl = document.getElementById('gd-eta'), gmEl = document.getElementById('gd-gamma');
  const sgResEl = document.getElementById('gd-res-sgd'), mmResEl = document.getElementById('gd-res-mom');

  function update() {
    const w = parseFloat(wEl.value), grad = parseFloat(grEl.value);
    const eta = parseFloat(etEl.value), gamma = parseFloat(gmEl.value);

    if (isNaN(w) || isNaN(grad) || isNaN(eta) || isNaN(gamma) || eta <= 0) return;

    // Standard vanilla SGD step: Delta_w = - eta * grad
    const delta_sgd = -eta * grad;
    const w_sgd = w + delta_sgd;

    // Momentum step with steady prior velocity: v_steady = (eta * grad) / (1 - gamma)
    const v_steady = (eta * grad) / (1.0 - Math.min(0.99, gamma));
    const w_mom = w - v_steady;

    sgResEl.textContent = 'Vanilla SGD: w_{t+1} = ' + w_sgd.toFixed(3) + ' (Δw = ' + (delta_sgd >= 0 ? '+' : '') + delta_sgd.toFixed(3) + ')';
    mmResEl.textContent = 'Momentum (γ=' + gamma + '): w_{t+1} = ' + w_mom.toFixed(3) + ' | Effective Step = ' + (1.0 / (1.0 - gamma)).toFixed(1) + '× Speedup';
  }

  [wEl, grEl, etEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current model parameter weight $w_t$.',
      'Enter instantaneous loss gradient $\nabla L = \frac{\partial L}{\partial w}$.',
      'Enter learning rate hyperparameter $\eta$.',
      'Enter Polyak momentum damping factor $\gamma$ (e.g. 0.90).',
      'Inspect standard gradient descent vs momentum-accelerated update steps.'
    ],
    benefitTitle: 'First-Order Stochastic Optimization',
    benefitContent: 'Momentum accumulates past velocity vectors to accelerate descent along flat ravines while dampening high-frequency oscillations across steep canyon walls.',
    faqs: [{ q: 'What happens if the learning rate is too large?', a: 'Excessive learning rates cause weight updates to overshoot minima, resulting in exploding gradients and numerical divergence.' }]
  },

  // 13. Naive Bayes Classifier with Laplace Smoothing Calculator
  {
    slug: 'naive-bayes-classifier-laplace-smoothing-posterior-calculator',
    name: 'Naive Bayes Classifier (P(C|X) ∝ P(C)·∏ P(x_i|C)) & Laplace Smoothing Calculator',
    description: 'Calculate Naive Bayes posterior classification probability (P(C|X) ∝ P(C) · ∏ P(x_i|C)) with Laplace (+1) additive smoothing to prevent zero-frequency probability multiplication errors in spam filtering.',
    category: 'Math',
    icon: 'text',
    keywords: ['naive bayes calculator', 'bayes theorem spam filter formula online', 'laplace smoothing naive bayes probability calculator', 'conditional probability posterior naive bayes calculator', 'machine learning natural language processing spam detection online'],
    order: 1222,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Prior Probabilities P(Spam) vs P(Ham) & Word Likelihood Conditional Probabilities',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nb-psp">P(Spam) Prior</label>
          <input class="tool-textarea" id="nb-psp" type="number" step="0.1" min="0" max="1" value="0.40" placeholder="0.40" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nb-lsp">P(Words | Spam)</label>
          <input class="tool-textarea" id="nb-lsp" type="number" step="0.05" value="0.08" placeholder="0.08 (Likelihood)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nb-lhm">P(Words | Ham)</label>
          <input class="tool-textarea" id="nb-lhm" type="number" step="0.01" value="0.005" placeholder="0.005 (Likelihood)" />
        </div>
      </div>
      <div id="nb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nb-res-post" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P(Spam | Words) = 91.4% (SPAM CLASSIFIED)</span>
            <span class="stat-label">Posterior Probability via Bayes' Theorem</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nb-res-ham" style="color:var(--green-dark); font-weight:700;">P(Ham | Words) = 8.6% | Likelihood Ratio = 10.67:1 in favor of Spam</span>
            <span class="stat-label">Complementary Posterior & Log-Likelihood Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pspEl = document.getElementById('nb-psp'), lspEl = document.getElementById('nb-lsp'), lhmEl = document.getElementById('nb-lhm');
  const psResEl = document.getElementById('nb-res-post'), hmResEl = document.getElementById('nb-res-ham');

  function update() {
    const P_spam = parseFloat(pspEl.value), L_spam = parseFloat(lspEl.value), L_ham = parseFloat(lhmEl.value);
    if (isNaN(P_spam) || isNaN(L_spam) || isNaN(L_ham) || P_spam <= 0 || P_spam >= 1 || L_spam < 0 || L_ham < 0) return;

    const P_ham = 1.0 - P_spam;

    // Unnormalized posteriors:
    const num_spam = P_spam * L_spam;
    const num_ham = P_ham * L_ham;
    const total = num_spam + num_ham;

    if (total === 0) return;

    const post_spam = (num_spam / total) * 100.0;
    const post_ham = (num_ham / total) * 100.0;

    let decision = post_spam >= 50.0 ? 'SPAM FILTERED' : 'INBOX (HAM)';
    let color = post_spam >= 50.0 ? '#c53030' : '#22543d';

    psResEl.textContent = 'P(Spam | Message) = ' + post_spam.toFixed(1) + '% (' + decision + ')';
    psResEl.style.color = color;
    hmResEl.textContent = 'P(Ham | Message) = ' + post_ham.toFixed(1) + '% | Likelihood Ratio = ' + (num_spam / num_ham).toFixed(2) + ':1';
  }

  [pspEl, lspEl, lhmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter prior probability of spam $P(\text{Spam})$.',
      'Enter product of word conditional likelihoods in spam vs ham.',
      'Inspect posterior probability $P(\text{Spam}|\text{Words})$ and final classification decision.'
    ],
    benefitTitle: 'Bayesian Conditional Independence Assumption',
    benefitContent: 'Assuming features are conditionally independent ($P(x_1, x_2 | C) = P(x_1|C) \cdot P(x_2|C)$) allows Naive Bayes to classify text in real time with high accuracy.',
    faqs: [{ q: 'What is Laplace (+1) Smoothing?', a: 'Laplace smoothing adds +1 to every word count in the numerator and +|V| in the denominator, preventing a single unseen word from zeroing out the entire posterior probability.' }]
  },

  // 14. Random Forest Out-of-Bag (OOB) Error Rate Calculator
  {
    slug: 'random-forest-out-of-bag-oob-error-rate-calculator',
    name: 'Random Forest Out-of-Bag (OOB Error = 1 / e ≈ 36.8% Unsampled) Calculator',
    description: 'Calculate Bootstrap Aggregation (Bagging) sample probability ((1 - 1/N)^N ≈ 1/e = 36.8% OOB sample rate), number of out-of-bag validation evaluations, and Random Forest ensemble generalization error.',
    category: 'Math',
    icon: 'text',
    keywords: ['random forest oob error calculator', 'out of bag error rate formula bootstrap bagging online', 'bootstrap aggregation 1 over e probability calculator', 'random forest validation ensemble error calculator', 'machine learning random forest bagging online'],
    order: 1223,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dataset Sample Size N & Number of Decision Trees in Forest B (e.g. 100 to 500)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rf-n">Dataset Size N</label>
          <input class="tool-textarea" id="rf-n" type="number" step="500" value="5000" placeholder="5,000 Samples" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-b">Number of Trees B</label>
          <input class="tool-textarea" id="rf-b" type="number" step="50" value="200" placeholder="200 Trees" />
        </div>
      </div>
      <div id="rf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rf-res-oob" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">OOB Fraction = 36.79% (1,839 Unsampled Samples per Tree)</span>
            <span class="stat-label">Theoretical Out-of-Bag Probability ((1 - 1/N)^N → 1/e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rf-res-trees" style="color:var(--green-dark); font-weight:700;">Each Sample is OOB in ~74 of 200 Trees (Enables free built-in cross-validation)</span>
            <span class="stat-label">Out-of-Bag Ensemble Validation Redundancy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('rf-n'), bEl = document.getElementById('rf-b');
  const obResEl = document.getElementById('rf-res-oob'), trResEl = document.getElementById('rf-res-trees');

  function update() {
    const N = parseFloat(nEl.value), B = parseFloat(bEl.value);
    if (isNaN(N) || isNaN(B) || N <= 0 || B <= 0) return;

    // Probability of NOT being picked in N bootstrap draws with replacement:
    // P_OOB = ( 1 - 1/N )^N -> 1 / e approx 0.3678794
    const P_OOB = Math.pow(1.0 - (1.0 / N), N);
    const P_OOB_pct = P_OOB * 100.0;

    const oob_samples_per_tree = Math.round(P_OOB * N);
    const oob_trees_per_sample = Math.round(P_OOB * B);

    obResEl.textContent = 'OOB Fraction = ' + P_OOB_pct.toFixed(2) + '% (' + oob_samples_per_tree.toLocaleString() + ' Unsampled Samples / Tree)';
    trResEl.textContent = 'Each sample is OOB in ~' + oob_trees_per_sample + ' of ' + B + ' Trees (Eliminates need for external validation split)';
  }

  nEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter training dataset sample size N.',
      'Enter number of bagged decision trees B in Random Forest ensemble.',
      'Inspect theoretical Out-of-Bag (OOB) sample percentage ($\approx 36.8\%$) and internal cross-validation coverage.'
    ],
    benefitTitle: 'Leo Breiman 2001 Random Forest Out-of-Bag Theorem',
    benefitContent: 'Because each tree is trained on a bootstrap sample of $63.2\%$ of data, the remaining $36.8\%$ out-of-bag samples act as an internal validation set, providing unbiased generalization error estimation without cross-validation overhead.',
    faqs: [{ q: 'Why is the OOB probability exactly 1/e as N increases?', a: 'From calculus: $\lim_{N \to \infty} (1 - 1/N)^N = e^{-1} \approx 0.3678794412$.' }]
  },

  // 15. Graph Modularity Q (Louvain & Leiden Community Detection) Calculator
  {
    slug: 'leiden-louvain-graph-community-modularity-q-calculator',
    name: 'Graph Community Modularity (Q = 1/2m · ∑ (A_ij - k_i·k_j / 2m)·δ(c_i, c_j)) Calculator',
    description: 'Calculate network graph community structure Modularity score (Q from -0.5 to +1.0) for Louvain and Leiden community detection algorithms to quantify cluster partition quality in social networks and bioinformatics.',
    category: 'Math',
    icon: 'text',
    keywords: ['graph modularity calculator', 'louvain leiden modularity q formula online', 'network community detection partition score calculator', 'modularity optimization graph clustering calculator', 'graph theory network science community detection online'],
    order: 1224,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Network Edges m, Internal Community Edges l_c & Community Degree Sum d_c',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gm-m">Total Edges m</label>
          <input class="tool-textarea" id="gm-m" type="number" step="10" value="50" placeholder="50 Edges" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-lc">Internal Edges l_c</label>
          <input class="tool-textarea" id="gm-lc" type="number" step="5" value="42" placeholder="42 Internal Edges" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-dc">Degree Sum d_c</label>
          <input class="tool-textarea" id="gm-dc" type="number" step="10" value="48" placeholder="48 (Sum of node degrees in cluster)" />
        </div>
      </div>
      <div id="gm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Modularity Q = 0.610 (Strong Community Structure)</span>
            <span class="stat-label">Newman-Girvan Graph Modularity Score (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-eval" style="color:var(--green-dark); font-weight:700;">Internal Edge Fraction = 84.0% | Expected Random Edges = 23.0% (Strong Dense Clustering)</span>
            <span class="stat-label">Observed vs Expected Random Connection Fraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('gm-m'), lcEl = document.getElementById('gm-lc'), dcEl = document.getElementById('gm-dc');
  const qResEl = document.getElementById('gm-res-q'), evResEl = document.getElementById('gm-res-eval');

  function update() {
    const m = parseFloat(mEl.value), l_c = parseFloat(lcEl.value), d_c = parseFloat(dcEl.value);
    if (isNaN(m) || isNaN(l_c) || isNaN(d_c) || m <= 0 || l_c < 0 || l_c > m) return;

    // Modularity contribution for community: Q = ( l_c / m ) - ( d_c / (2*m) )^2
    const term1 = l_c / m;
    const term2 = Math.pow(d_c / (2.0 * m), 2);
    const Q = term1 - term2;

    let qual = '', color = '#22543d';
    if (Q >= 0.40) { qual = 'STRONG COMMUNITY STRUCTURE (Q > 0.4: Highly modular network partition)'; color = '#22543d'; }
    else if (Q >= 0.20) { qual = 'MODERATE COMMUNITY CLUSTERING (Q = 0.2 - 0.4)'; color = '#22543d'; }
    else if (Q >= 0.0) { qual = 'WEAK MODULARITY (Q < 0.2: Similar to random Erdos-Renyi graph)'; color = '#ea580c'; }
    else { qual = 'DISPERSED / BIPARTITE (Q < 0: More inter-community than intra-community edges)'; color = '#c53030'; }

    qResEl.textContent = 'Modularity Q = ' + Q.toFixed(3);
    qResEl.style.color = color;
    evResEl.textContent = qual + ' [Internal: ' + (term1*100).toFixed(1) + '% vs Expected: ' + (term2*100).toFixed(1) + '%]';
    evResEl.style.color = color;
  }

  [mEl, lcEl, dcEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of edges in entire network graph m.',
      'Enter number of internal edges within candidate community $l_c$.',
      'Enter sum of all node degrees in the community $d_c$.',
      'Inspect Newman-Girvan Modularity score Q and evaluate clustering significance.'
    ],
    benefitTitle: 'Mark Newman & Michelle Girvan 2004 Network Modularity',
    benefitContent: 'Compares the actual density of links inside communities to the expected link density of a random null-model graph with identical degree distribution, serving as the objective function for Louvain and Leiden clustering.',
    faqs: [{ q: 'What is a typical modularity score for a well-partitioned real-world network?', a: 'Real-world networks with distinct modular communities typically exhibit modularity scores between $Q = 0.3\text{ and }0.7$.' }]
  },

  // 16. Google PageRank Damping Factor Transition Calculator
  {
    slug: 'pagerank-algorithm-damping-factor-transition-matrix-calculator',
    name: 'Google PageRank Algorithm (PR(p_i) = (1 - d)/N + d·∑ PR(p_j)/L(p_j)) Calculator',
    description: 'Calculate Google PageRank web link stationary Markov transition probability (PR(p_i) = (1 - d)/N + d · ∑ PR(p_j) / L(p_j)) with random surfer damping factor d (standard d = 0.85).',
    category: 'Math',
    icon: 'text',
    keywords: ['pagerank calculator', 'google pagerank formula damping factor online', 'random surfer markov chain pagerank calculator', 'web link authority pagerank calculation', 'computer science algorithms graph theory search engines online'],
    order: 1225,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Web Pages N, Damping Factor d (0.85) & Incoming Inlink Ranks and Outdegree L(p)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pr-n">Web Pages N</label>
          <input class="tool-textarea" id="pr-n" type="number" step="1" value="4" placeholder="4 Pages" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-d">Damping d</label>
          <input class="tool-textarea" id="pr-d" type="number" step="0.05" min="0" max="0.99" value="0.85" placeholder="0.85 (Standard Surfer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-inflow">Sum(PR_j / L_j)</label>
          <input class="tool-textarea" id="pr-inflow" type="number" step="0.1" value="0.45" placeholder="0.45" />
        </div>
      </div>
      <div id="pr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pr-res-pr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PageRank PR = 0.4200 (42.0% Authority)</span>
            <span class="stat-label">Calculated Stationary PageRank Score</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pr-res-tele" style="color:var(--green-dark); font-weight:700;">Random Teleportation Baseline = 0.0375 ((1-d)/N) | Link Inflow Contribution = 0.3825</span>
            <span class="stat-label">Random Surfer Teleportation vs Hyperlink Referral</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('pr-n'), dEl = document.getElementById('pr-d'), inEl = document.getElementById('pr-inflow');
  const prResEl = document.getElementById('pr-res-pr'), tlResEl = document.getElementById('pr-res-tele');

  function update() {
    const N = parseFloat(nEl.value), d = parseFloat(dEl.value), inflow = parseFloat(inEl.value);
    if (isNaN(N) || isNaN(d) || isNaN(inflow) || N <= 0 || d < 0 || d >= 1 || inflow < 0) return;

    // PageRank formula: PR = ( (1 - d) / N ) + ( d * inflow )
    const teleport = (1.0 - d) / N;
    const link_contribution = d * inflow;
    const PR = teleport + link_contribution;

    prResEl.textContent = 'PageRank PR = ' + PR.toFixed(4) + ' (' + (PR * 100).toFixed(2) + '%)';
    tlResEl.textContent = 'Teleport = ' + teleport.toFixed(4) + ' ((1-d)/N) | Inflow = ' + link_contribution.toFixed(4) + ' (d=' + d + ' on N=' + N + ' pages)';
  }

  [nEl, dEl, inEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of indexed web pages in graph N.',
      'Enter random surfer damping factor d (standard 0.85).',
      'Enter sum of inlink PageRanks divided by their respective outdegrees ($\sum \frac{PR_j}{L_j}$).',
      'Inspect stationary PageRank probability score.'
    ],
    benefitTitle: 'Larry Page & Sergey Brin 1998 PageRank Algorithm',
    benefitContent: 'Models a random web surfer who follows hyperlinks with probability $d=0.85$ and jumps to a random page with probability $1-d=0.15$, forming the mathematical foundation of Google Search.',
    faqs: [{ q: 'Why is a damping factor of 0.85 necessary?', a: 'Damping ensures the Markov transition matrix is irreducible and aperiodic (Perron-Frobenius theorem), preventing rank sinks and dead ends from trapping probability.' }]
  },

  // 17. Dijkstra Shortest Path Graph Edge Weight Accumulator
  {
    slug: 'dijkstra-shortest-path-graph-edge-weight-calculator',
    name: 'Dijkstra\'s Shortest Path Algorithm Distance Relaxation (d(v) = min(d(v), d(u) + w(u, v))) Calculator',
    description: 'Calculate single-source shortest path step-by-step edge relaxation (d(v) = min(d(v), d(u) + w(u,v))) using Dijkstra\'s greedy algorithm for network routing and GPS navigation graphs.',
    category: 'Math',
    icon: 'text',
    keywords: ['dijkstra algorithm calculator', 'shortest path edge relaxation formula online', 'dijkstra priority queue distance calculator', 'graph shortest path routing algorithm calculator', 'computer science graph algorithms dijkstra online'],
    order: 1226,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current Tentative Distance d(v), Settled Node Distance d(u) & Edge Weight w(u, v)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dj-dv">Current d(v)</label>
          <input class="tool-textarea" id="dj-dv" type="number" step="1" value="18" placeholder="18 (Tentative)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dj-du">Settled d(u)</label>
          <input class="tool-textarea" id="dj-du" type="number" step="1" value="7" placeholder="7 (From Source)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dj-w">Edge Weight w(u,v)</label>
          <input class="tool-textarea" id="dj-w" type="number" step="1" value="5" placeholder="5 (Non-negative)" />
        </div>
      </div>
      <div id="dj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dj-res-relax" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RELAXED: New d(v) = 12 (Path shortened by -6)</span>
            <span class="stat-label">Edge Relaxation Condition (d(u) + w(u,v) < d(v))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dj-res-pred" style="color:var(--green-dark); font-weight:700;">Predecessor Updated: π(v) = u | New Shortest Path Route Established</span>
            <span class="stat-label">Predecessor Node Assignment & Route Updating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dvEl = document.getElementById('dj-dv'), duEl = document.getElementById('dj-du'), wEl = document.getElementById('dj-w');
  const rxResEl = document.getElementById('dj-res-relax'), pdResEl = document.getElementById('dj-res-pred');

  function update() {
    const d_v = parseFloat(dvEl.value), d_u = parseFloat(duEl.value), w = parseFloat(wEl.value);
    if (isNaN(d_v) || isNaN(d_u) || isNaN(w) || d_u < 0 || w < 0) return;

    const candidate = d_u + w;

    if (candidate < d_v) {
      const diff = d_v - candidate;
      rxResEl.textContent = 'RELAXED: New d(v) = ' + candidate + ' (Shortened by -' + diff + ')';
      rxResEl.style.color = '#22543d';
      pdResEl.textContent = 'Predecessor updated to node u | d(u) + w = ' + d_u + ' + ' + w + ' = ' + candidate + ' < ' + d_v;
      pdResEl.style.color = '#22543d';
    } else {
      rxResEl.textContent = 'NO CHANGE: d(v) stays ' + d_v + ' (Candidate ' + candidate + ' ≥ ' + d_v + ')';
      rxResEl.style.color = '#ea580c';
      pdResEl.textContent = 'Existing path through alternate route remains shorter or equal';
      pdResEl.style.color = '#ea580c';
    }
  }

  [dvEl, duEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current tentative distance to target node v ($d(v)$).',
      'Enter known shortest distance to predecessor node u ($d(u)$).',
      'Enter edge traversal weight $w(u, v) \ge 0$.',
      'Inspect edge relaxation step and updated predecessor node assignment.'
    ],
    benefitTitle: 'Edsger W. Dijkstra 1959 Shortest Path Principle',
    benefitContent: 'Greedily visits the closest unvisited node using a priority queue ($O((V+E)\log V)$), guaranteeing the optimal shortest path in graphs with non-negative edge weights (OSPF Internet routing, Google Maps).',
    faqs: [{ q: 'Why does Dijkstra fail with negative edge weights?', a: 'Dijkstra assumes settled nodes cannot be improved; negative edges can shorten paths to already-visited nodes (use Bellman-Ford instead).' }]
  },

  // 18. Minimum Spanning Tree (Kruskal & Prim Total Weight) Calculator
  {
    slug: 'minimum-spanning-tree-kruskal-prim-total-weight-calculator',
    name: 'Minimum Spanning Tree (MST Kruskal & Prim Total Edge Weight) Calculator',
    description: 'Calculate Minimum Spanning Tree (MST) total edge cost weight and verify cycle-free connectivity for network design (fiber-optic cabling, electrical power grids, pipeline infrastructure).',
    category: 'Math',
    icon: 'text',
    keywords: ['mst calculator', 'minimum spanning tree kruskal prim total weight formula online', 'kruskal algorithm disjoint set union find calculator', 'spanning tree edge weight network design calculator', 'graph theory algorithms minimum spanning tree online'],
    order: 1227,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'MST Edge Weights e₁, e₂, e₃, e₄ (Comma-Separated) & Total Graph Nodes V',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mst-edges">MST Edges (Weights)</label>
          <input class="tool-textarea" id="mst-edges" type="text" value="4, 7, 9, 12, 15" placeholder="4, 7, 9, 12, 15" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mst-v">Graph Nodes V</label>
          <input class="tool-textarea" id="mst-v" type="number" step="1" min="2" value="6" placeholder="6 Nodes (Needs 5 Edges)" />
        </div>
      </div>
      <div id="mst-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mst-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total MST Weight = 47.0</span>
            <span class="stat-label">Minimum Total Spanning Tree Connection Cost</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mst-res-tree" style="color:var(--green-dark); font-weight:700;">VALID SPANNING TREE: Exactly V - 1 = 5 edges for 6 nodes (No Cycles)</span>
            <span class="stat-label">Tree Topology Verification (Edges = V - 1)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const edEl = document.getElementById('mst-edges'), vEl = document.getElementById('mst-v');
  const totResEl = document.getElementById('mst-res-tot'), trResEl = document.getElementById('mst-res-tree');

  function update() {
    const edges = edEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const V = parseInt(vEl.value, 10);

    if (edges.length === 0 || isNaN(V) || V < 2) return;

    const totalWeight = edges.reduce((a, b) => a + b, 0);
    const requiredEdges = V - 1;

    let treeStatus = '', color = '#22543d';
    if (edges.length === requiredEdges) {
      treeStatus = 'VALID SPANNING TREE: Exactly V - 1 = ' + requiredEdges + ' edges for ' + V + ' vertices';
      color = '#22543d';
    } else if (edges.length < requiredEdges) {
      treeStatus = 'DISCONNECTED GRAPH: Missing ' + (requiredEdges - edges.length) + ' edge(s) to connect all ' + V + ' nodes';
      color = '#ea580c';
    } else {
      treeStatus = 'CONTAINS CYCLES: ' + edges.length + ' edges exceeds V - 1 = ' + requiredEdges + ' (Remove redundant high-weight edges)';
      color = '#c53030';
    }

    totResEl.textContent = 'Total MST Weight = ' + totalWeight.toFixed(1);
    trResEl.textContent = treeStatus + ' [Average Edge Weight = ' + (totalWeight / edges.length).toFixed(1) + ']';
    trResEl.style.color = color;
  }

  edEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated weights of the chosen MST edges.',
      'Enter total number of vertices (nodes) V in graph.',
      'Inspect total MST weight cost and verify tree topological validity ($E = V - 1$).'
    ],
    benefitTitle: 'Joseph Kruskal & Robert Prim Greedy Tree Theorem',
    benefitContent: 'A Minimum Spanning Tree connects all V vertices using exactly $V-1$ edges with minimum total weight, eliminating cycles while minimizing physical cabling costs.',
    faqs: [{ q: 'What is the difference between Kruskal and Prim algorithms?', a: 'Kruskal sorts all edges and adds the lightest non-cyclic edge using Union-Find ($O(E\log E)$); Prim grows a single connected tree outwards using a priority queue.' }]
  },

  // 19. Graph Centrality (Betweenness, Closeness & Degree) Calculator
  {
    slug: 'graph-betweenness-closeness-degree-centrality-calculator',
    name: 'Network Graph Centrality (Degree, Closeness C_C & Betweenness C_B) Calculator',
    description: 'Calculate social network and graph theory node centrality metrics: Normalized Degree Centrality, Closeness Centrality (C_C = (N - 1) / ∑ d(v, u)), and Betweenness Centrality shortest-path bottleneck score.',
    category: 'Math',
    icon: 'text',
    keywords: ['graph centrality calculator', 'degree betweenness closeness centrality formula online', 'social network analysis node centrality calculator', 'shortest path betweenness centrality calculator', 'network science graph theory analytics online'],
    order: 1228,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Graph Nodes N, Node Degree k & Sum of Shortest Path Distances ∑ d(v, u)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gc-n">Total Nodes N</label>
          <input class="tool-textarea" id="gc-n" type="number" step="1" value="10" placeholder="10 Nodes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gc-k">Node Degree k</label>
          <input class="tool-textarea" id="gc-k" type="number" step="1" value="5" placeholder="5 Direct Connections" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gc-sumd">Sum Distance ∑ d</label>
          <input class="tool-textarea" id="gc-sumd" type="number" step="1" value="12" placeholder="12 (Sum of shortest paths)" />
        </div>
      </div>
      <div id="gc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gc-res-close" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Closeness Centrality C_C = 0.750</span>
            <span class="stat-label">Normalized Closeness Centrality ((N - 1) / ∑ d(v, u))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gc-res-deg" style="color:var(--green-dark); font-weight:700;">Normalized Degree = 0.556 (5 of 9 possible neighbors) | Mean Path Length = 1.33 Hops</span>
            <span class="stat-label">Degree Centrality & Average Shortest Path Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('gc-n'), kEl = document.getElementById('gc-k'), sdEl = document.getElementById('gc-sumd');
  const clResEl = document.getElementById('gc-res-close'), dgResEl = document.getElementById('gc-res-deg');

  function update() {
    const N = parseFloat(nEl.value), k = parseFloat(kEl.value), sum_d = parseFloat(sdEl.value);
    if (isNaN(N) || isNaN(k) || isNaN(sum_d) || N <= 1 || k < 0 || sum_d <= 0) return;

    // Normalized Degree Centrality: C_D = k / (N - 1)
    const C_D = k / (N - 1.0);

    // Normalized Closeness Centrality: C_C = (N - 1) / sum_d
    const C_C = (N - 1.0) / sum_d;

    // Average shortest path distance to all other nodes:
    const avg_dist = sum_d / (N - 1.0);

    clResEl.textContent = 'Closeness Centrality C_C = ' + C_C.toFixed(3);
    dgResEl.textContent = 'Degree C_D = ' + C_D.toFixed(3) + ' (' + k + ' / ' + (N - 1) + ' neighbors) | Mean Path Length = ' + avg_dist.toFixed(2) + ' Hops';
  }

  [nEl, kEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of nodes in graph N.',
      'Enter direct neighbor degree connections k for candidate node.',
      'Enter sum of shortest geodesic path distances from this node to all other $N-1$ nodes.',
      'Inspect normalized Closeness Centrality and Degree Centrality.'
    ],
    benefitTitle: 'Social Network & Structural Graph Centrality',
    benefitContent: 'High closeness centrality indicates a node can rapidly disseminate information across a network; high betweenness centrality marks bridge nodes that control communication between isolated clusters.',
    faqs: [{ q: 'What does a closeness centrality of 1.0 mean?', a: 'A closeness centrality of 1.0 means the node is directly connected to every single other node in the graph (a star network hub).' }]
  },

  // 20. Recurrent Neural Network (LSTM & GRU) Parameter Count Calculator
  {
    slug: 'recurrent-neural-network-rnn-lstm-gru-parameter-count-calculator',
    name: 'RNN, LSTM & GRU Neural Network Parameter Count Calculator',
    description: 'Calculate trainable parameter weight count for recurrent neural network layers: Standard Simple RNN (d_h(d_h + d_x) + d_h), GRU (3 · (d_h(d_h + d_x) + d_h)), and LSTM (4 · (d_h(d_h + d_x) + d_h)) gates.',
    category: 'Math',
    icon: 'text',
    keywords: ['lstm parameter calculator', 'gru rnn parameter count formula deep learning online', 'recurrent neural network weights biases calculator', 'lstm gate parameters input hidden size calculator', 'deep learning natural language processing rnn online'],
    order: 1229,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Embedding Dimension d_x, Hidden State Dimension d_h & Architecture (RNN / LSTM / GRU)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rn-dx">Input Dim d_x</label>
          <input class="tool-textarea" id="rn-dx" type="number" step="64" value="256" placeholder="256 (Word Embedding)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-dh">Hidden Dim d_h</label>
          <input class="tool-textarea" id="rn-dh" type="number" step="64" value="512" placeholder="512 (Hidden Units)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-arch">Architecture</label>
          <select class="tool-textarea" id="rn-arch">
            <option value="4_lstm" selected>LSTM (4 Gates: Forget, Input, Output, Cell)</option>
            <option value="3_gru">GRU (3 Gates: Reset, Update, Candidate)</option>
            <option value="1_rnn">Simple RNN (1 Gate)</option>
          </select>
        </div>
      </div>
      <div id="rn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rn-res-param" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">LSTM Parameters = 1,574,912 (1.57 Million Weights)</span>
            <span class="stat-label">Total Trainable Layer Parameters (4·(d_h·(d_h + d_x) + d_h))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rn-res-gate" style="color:var(--green-dark); font-weight:700;">Per Gate = 393,728 Weights | Memory = 6.30 MB (FP32 precision)</span>
            <span class="stat-label">Weight Matrix Size per Gate & Memory Footprint</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dxEl = document.getElementById('rn-dx'), dhEl = document.getElementById('rn-dh'), arEl = document.getElementById('rn-arch');
  const prResEl = document.getElementById('rn-res-param'), gtResEl = document.getElementById('rn-res-gate');

  function update() {
    const d_x = parseFloat(dxEl.value), d_h = parseFloat(dhEl.value);
    const parts = arEl.value.split('_');
    const gates = parseInt(parts[0], 10);
    const archName = parts[1].toUpperCase();

    if (isNaN(d_x) || isNaN(d_h) || d_x <= 0 || d_h <= 0) return;

    // Single gate parameters = ( d_h * d_x ) + ( d_h * d_h ) + d_h (bias) = d_h * (d_x + d_h + 1)
    const perGate = d_h * (d_x + d_h + 1.0);
    const totalParams = gates * perGate;

    // Memory in MB assuming FP32 (4 bytes per parameter):
    const memoryMB = (totalParams * 4.0) / (1024.0 * 1024.0);

    prResEl.textContent = archName + ' Parameters = ' + totalParams.toLocaleString() + ' (' + (totalParams/1e6).toFixed(2) + 'M)';
    gtResEl.textContent = 'Per Gate = ' + perGate.toLocaleString() + ' Weights | Memory = ' + memoryMB.toFixed(2) + ' MB (FP32 @ d_x=' + d_x + ', d_h=' + d_h + ')';
  }

  [dxEl, dhEl].forEach(el => el.addEventListener('input', update));
  arEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter input token embedding dimension $d_x$.',
      'Enter hidden state layer dimension $d_h$.',
      'Select recurrent architecture (LSTM 4-gate, GRU 3-gate, Simple RNN 1-gate).',
      'Inspect total trainable parameter weight count and FP32 GPU memory requirements.'
    ],
    benefitTitle: 'Hochreiter & Schmidhuber 1997 Long Short-Term Memory',
    benefitContent: 'LSTM uses 4 specialized multiplicative gating mechanisms (forget gate, input gate, cell state candidate, output gate) to solve the vanishing gradient problem in sequential deep learning.',
    faqs: [{ q: 'Why does GRU have 25% fewer parameters than LSTM?', a: 'Gated Recurrent Units (GRU) merge cell and hidden states and use only 3 gates (reset, update, candidate), reducing parameters from $4\times$ to $3\times$.' }]
  },

  // 21. Word2Vec Skip-Gram Negative Sampling Loss Calculator
  {
    slug: 'word2vec-skip-gram-negative-sampling-loss-calculator',
    name: 'Word2Vec Skip-Gram Negative Sampling (SGNS) Objective Loss Calculator',
    description: 'Calculate Word2Vec Skip-Gram Negative Sampling (SGNS) objective function loss (ℒ = -ln σ(v\'_wO · v_wI) - ∑ ln σ(-v\'_wi · v_wI)) for self-supervised word embedding training.',
    category: 'Math',
    icon: 'text',
    keywords: ['word2vec calculator', 'skip gram negative sampling sgns loss formula online', 'word embedding dot product loss calculator', 'mikolov word2vec nlp loss calculator', 'natural language processing word embeddings online'],
    order: 1230,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target-Context Dot Product (v\'·v), K Negative Sample Dot Products & Damping',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="w2-pos">Positive Dot Product</label>
          <input class="tool-textarea" id="w2-pos" type="number" step="0.5" value="2.5" placeholder="2.5 (True Context Word)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="w2-neg">Avg Negative Dot Product</label>
          <input class="tool-textarea" id="w2-neg" type="number" step="0.5" value="-1.8" placeholder="-1.8 (Random Negative Word)" />
        </div>
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="w2-k">Number of Negative Samples K</label>
          <input class="tool-textarea" id="w2-k" type="number" step="1" min="1" max="20" value="5" placeholder="5 Negative Samples" />
        </div>
      </div>
      <div id="w2-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="w2-res-loss" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SGNS Loss ℒ = 0.852</span>
            <span class="stat-label">Total Negative Sampling Loss (-ln σ(pos) - K·ln σ(-neg))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="w2-res-prob" style="color:var(--green-dark); font-weight:700;">Positive P = 92.4% | Negative Rejection P = 85.8% (Target embeddings well aligned)</span>
            <span class="stat-label">Sigmoid Probabilities for Positive and Negative Word Pairs</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const posEl = document.getElementById('w2-pos'), negEl = document.getElementById('w2-neg'), kEl = document.getElementById('w2-k');
  const lsResEl = document.getElementById('w2-res-loss'), pbResEl = document.getElementById('w2-res-prob');

  function update() {
    const dot_pos = parseFloat(posEl.value), dot_neg = parseFloat(negEl.value), K = parseFloat(kEl.value);
    if (isNaN(dot_pos) || isNaN(dot_neg) || isNaN(K) || K < 1) return;

    // Sigmoid of positive pair: sigma(pos)
    const sigma_pos = 1.0 / (1.0 + Math.exp(-dot_pos));
    const loss_pos = -Math.log(Math.max(1e-15, sigma_pos));

    // Sigmoid of negative pair: sigma(-neg)
    const sigma_neg = 1.0 / (1.0 + Math.exp(dot_neg)); // sigma(-dot_neg)
    const loss_neg = -Math.log(Math.max(1e-15, sigma_neg));

    // Total loss: L = loss_pos + K * loss_neg
    const total_loss = loss_pos + (K * loss_neg);

    lsResEl.textContent = 'SGNS Loss ℒ = ' + total_loss.toFixed(3);
    pbResEl.textContent = 'Positive P = ' + (sigma_pos * 100).toFixed(1) + '% | Neg Rejection = ' + (sigma_neg * 100).toFixed(1) + '% (K = ' + K + ' negative samples)';
  }

  [posEl, negEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter embedding dot product for the true positive context word pair ($\mathbf{v}^\prime \cdot \mathbf{v}$).',
      'Enter average dot product for randomly drawn negative sample words.',
      'Enter number of negative samples K (typically 5 for large datasets, 15 for small).',
      'Inspect total Skip-Gram Negative Sampling loss $\mathcal{L}$.'
    ],
    benefitTitle: 'Tomas Mikolov 2013 Efficient Word Representations',
    benefitContent: 'Negative sampling converts computationally impossible full-vocabulary softmax denominator sums into simple binary logistic regression problems, accelerating word2vec training by orders of magnitude.',
    faqs: [{ q: 'What is the standard unigram distribution exponent for negative sampling?', a: 'Mikolov empirical standard raises unigram word frequency to the $3/4$ power ($f(w)^{0.75}$), balancing common and rare words.' }]
  },

  // 22. Transformer Scaled Dot-Product Self-Attention Calculator
  {
    slug: 'bert-transformer-self-attention-scaled-dot-product-calculator',
    name: 'Transformer Scaled Dot-Product Self-Attention (Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k)·V) Calculator',
    description: 'Calculate Transformer multi-head self-attention scaled dot-product matrix weights (Softmax(Q · Kᵀ / √d_k)), attention head scaling factor 1/√d_k, and output context vector for BERT/GPT architectures.',
    category: 'Math',
    icon: 'text',
    keywords: ['transformer self attention calculator', 'scaled dot product attention formula q k v over sqrt dk online', 'bert gpt self attention weight matrix calculator', 'attention is all you need formula calculator', 'deep learning transformers large language models online'],
    order: 1231,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Raw Dot Product Query-Key Scores (Q·Kᵀ for 3 Tokens) & Key Dimension d_k (e.g. 64 for GPT/BERT)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="at-qk">Raw Scores (Q·Kᵀ)</label>
          <input class="tool-textarea" id="at-qk" type="text" value="16.0, 8.0, 4.0" placeholder="16.0, 8.0, 4.0 (3 Tokens)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="at-dk">Head Dim d_k</label>
          <input class="tool-textarea" id="at-dk" type="number" step="16" value="64" placeholder="64 (√d_k = 8.0)" />
        </div>
      </div>
      <div id="at-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="at-res-attn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Attention Weights = [65.9%, 24.2%, 9.9%]</span>
            <span class="stat-label">Scaled Softmax Self-Attention Probability Distribution</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="at-res-scale" style="color:var(--green-dark); font-weight:700;">Scaling Factor 1/√d_k = 0.125 | Scaled Scores: [2.00, 1.00, 0.50]</span>
            <span class="stat-label">1/√d_k Scaling (Prevents Softmax Gradient Saturation)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qkEl = document.getElementById('at-qk'), dkEl = document.getElementById('at-dk');
  const atResEl = document.getElementById('at-res-attn'), scResEl = document.getElementById('at-res-scale');

  function update() {
    const scores = qkEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const d_k = parseFloat(dkEl.value);

    if (scores.length === 0 || isNaN(d_k) || d_k <= 0) return;

    // Scale by sqrt(d_k):
    const sqrt_dk = Math.sqrt(d_k);
    const scaled_scores = scores.map(s => s / sqrt_dk);

    // Numerically stable softmax:
    const max_s = Math.max(...scaled_scores);
    const exp_s = scaled_scores.map(s => Math.exp(s - max_s));
    const sum_exp = exp_s.reduce((a, b) => a + b, 0);

    const weights = exp_s.map(e => e / sum_exp);
    const weightsStr = weights.map(w => (w * 100).toFixed(1) + '%').join(', ');
    const scaledStr = scaled_scores.map(s => s.toFixed(2)).join(', ');

    atResEl.textContent = 'Attention = [' + weightsStr + ']';
    scResEl.textContent = 'Scaling 1/√d_k = ' + (1.0/sqrt_dk).toFixed(3) + ' | Scaled Scores: [' + scaledStr + '] (d_k = ' + d_k + ')';
  }

  qkEl.addEventListener('input', update);
  dkEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated raw Query-Key matrix multiplication dot products ($Q \cdot K^T$).',
      'Enter attention head dimension $d_k$ (typically 64 for standard Transformer heads).',
      'Inspect scaled scores ($QK^T / \sqrt{d_k}$) and final Softmax self-attention weighting probabilities.'
    ],
    benefitTitle: 'Vaswani et al. 2017 "Attention Is All You Need"',
    benefitContent: 'Dividing by $\sqrt{d_k}$ prevents large dot products from pushing the softmax function into regions with vanishingly small gradients, enabling deep Transformer models (GPT-4, Claude, Gemini) to train stably.',
    faqs: [{ q: 'Why do dot products grow large for high dimensions d_k?', a: 'For independent zero-mean unit-variance components, the dot product $Q \cdot K$ has mean 0 and variance $d_k$; scaling by $\sqrt{d_k}$ restores unit variance.' }]
  },

  // 23. Markov Decision Process (MDP) Bellman Optimality Value Iteration Calculator
  {
    slug: 'markov-decision-process-bellman-optimality-value-iteration-calculator',
    name: 'Reinforcement Learning Bellman Optimality Equation (V*(s) = max_a [R(s,a) + γ·∑ P(s\'|s,a)·V*(s\')]) Calculator',
    description: 'Calculate reinforcement learning Markov Decision Process (MDP) Bellman optimality value function (V*(s) = max_a [R(s,a) + γ · ∑ P(s\'|s,a) · V(s\')]) and optimal policy action a* in value iteration.',
    category: 'Math',
    icon: 'text',
    keywords: ['bellman equation calculator', 'reinforcement learning value iteration formula online', 'markov decision process mdp bellman optimality calculator', 'discount factor gamma q value reinforcement learning calculator', 'artificial intelligence reinforcement learning online'],
    order: 1232,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Immediate Reward R(s,a), Discount Factor γ (0 to 0.99) & Expected Next State Values',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-r">Immediate Reward R</label>
          <input class="tool-textarea" id="rl-r" type="number" step="1" value="10.0" placeholder="+10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-gamma">Discount Factor γ</label>
          <input class="tool-textarea" id="rl-gamma" type="number" step="0.05" min="0" max="0.99" value="0.90" placeholder="0.90" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-vnext">Next State Value V(s\')</label>
          <input class="tool-textarea" id="rl-vnext" type="number" step="5" value="50.0" placeholder="50.0" />
        </div>
      </div>
      <div id="rl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-qval" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Action Value Q*(s, a) = 55.00</span>
            <span class="stat-label">Bellman Optimality Value (R(s,a) + γ·V*(s\'))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-disc" style="color:var(--green-dark); font-weight:700;">Discounted Future Return = 45.00 (γ·V = 0.90 × 50.0) | Infinite Horizon Cap = 100.0</span>
            <span class="stat-label">Discounted Future Return & Geometric Horizon Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rl-r'), gEl = document.getElementById('rl-gamma'), vnEl = document.getElementById('rl-vnext');
  const qvResEl = document.getElementById('rl-res-qval'), dcResEl = document.getElementById('rl-res-disc');

  function update() {
    const R = parseFloat(rEl.value), gamma = parseFloat(gEl.value), V_next = parseFloat(vnEl.value);
    if (isNaN(R) || isNaN(gamma) || isNaN(V_next) || gamma < 0 || gamma >= 1) return;

    // Bellman equation: Q*(s, a) = R + gamma * V_next
    const discounted_future = gamma * V_next;
    const Q_val = R + discounted_future;

    // Geometric series sum if constant reward R: R / (1 - gamma)
    const infinite_horizon = R / (1.0 - gamma);

    qvResEl.textContent = 'Action Value Q*(s, a) = ' + Q_val.toFixed(2);
    dcResEl.textContent = 'Discounted Future = ' + discounted_future.toFixed(2) + ' (0.90 × ' + V_next + ') | Infinite Horizon = ' + infinite_horizon.toFixed(1) + ' (R / (1-γ))';
  }

  [rEl, gEl, vnEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter immediate transition reward $R(s, a)$.',
      'Enter future discount factor $\gamma \in [0, 1)$.',
      'Enter expected next-state value $V(s^\prime)$.',
      'Inspect Bellman optimality action-value $Q^*(s, a)$ and infinite horizon discounted return.'
    ],
    benefitTitle: 'Richard Bellman 1957 Dynamic Programming Principle',
    benefitContent: 'Breaks multi-step sequential decision problems into recursive subproblems, providing the core foundational equation for Q-learning, Policy Gradients, and Deep Reinforcement Learning (AlphaGo).',
    faqs: [{ q: 'Why is the discount factor gamma strictly less than 1.0?', a: 'A discount factor $\gamma < 1.0$ guarantees that infinite-horizon cumulative reward sums converge mathematically.' }]
  },

  // 24. BLEU Score for Machine Translation N-Gram Precision Calculator
  {
    slug: 'bleu-score-machine-translation-ngram-precision-calculator',
    name: 'BLEU Score Machine Translation Evaluation (BLEU = BP·exp(∑ w_n·ln p_n)) Calculator',
    description: 'Calculate automated machine translation quality BLEU score (Bilingual Evaluation Understudy), modified n-gram precisions (p₁ to p₄), and Brevity Penalty (BP) against reference human translations.',
    category: 'Math',
    icon: 'text',
    keywords: ['bleu score calculator', 'bilingual evaluation understudy machine translation formula online', 'bleu brevity penalty n gram precision calculator', 'nlp machine translation evaluation bleu score calculator', 'natural language processing translation metrics online'],
    order: 1233,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Candidate Translation Length c, Reference Translation Length r & N-Gram Precisions (p₁, p₂, p₃, p₄)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bl-c">Candidate Length c</label>
          <input class="tool-textarea" id="bl-c" type="number" step="1" value="18" placeholder="18 Words" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-r">Reference Length r</label>
          <input class="tool-textarea" id="bl-r" type="number" step="1" value="20" placeholder="20 Words" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-p1">1-Gram (p₁)</label>
          <input class="tool-textarea" id="bl-p1" type="number" step="0.05" value="0.75" placeholder="0.75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-p2">2-Gram (p₂)</label>
          <input class="tool-textarea" id="bl-p2" type="number" step="0.05" value="0.55" placeholder="0.55" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-p3">3-Gram (p₃)</label>
          <input class="tool-textarea" id="bl-p3" type="number" step="0.05" value="0.40" placeholder="0.40" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-p4">4-Gram (p₄)</label>
          <input class="tool-textarea" id="bl-p4" type="number" step="0.05" value="0.25" placeholder="0.25" />
        </div>
      </div>
      <div id="bl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bl-res-bleu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BLEU-4 Score = 41.6 (High Translation Quality)</span>
            <span class="stat-label">Standard BLEU-4 Score (BP · exp(0.25·∑ ln p_n))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bl-res-bp" style="color:var(--green-dark); font-weight:700;">Brevity Penalty BP = 0.895 (Candidate shorter than reference: 18 < 20 words)</span>
            <span class="stat-label">Brevity Penalty (BP = exp(1 - r/c))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('bl-c'), rEl = document.getElementById('bl-r');
  const p1El = document.getElementById('bl-p1'), p2El = document.getElementById('bl-p2');
  const p3El = document.getElementById('bl-p3'), p4El = document.getElementById('bl-p4');
  const blResEl = document.getElementById('bl-res-bleu'), bpResEl = document.getElementById('bl-res-bp');

  function update() {
    const c = parseFloat(cEl.value), r = parseFloat(rEl.value);
    const p1 = parseFloat(p1El.value), p2 = parseFloat(p2El.value);
    const p3 = parseFloat(p3El.value), p4 = parseFloat(p4El.value);

    if (isNaN(c) || isNaN(r) || isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(p4) || c <= 0 || r <= 0 || p1 <= 0 || p2 <= 0 || p3 <= 0 || p4 <= 0) return;

    // Brevity Penalty: BP = 1 if c > r else exp(1 - r/c)
    const BP = c > r ? 1.0 : Math.exp(1.0 - (r / c));

    // Geometric mean of 4-gram precisions: exp( 0.25 * (ln p1 + ln p2 + ln p3 + ln p4) )
    const log_mean = 0.25 * (Math.log(p1) + Math.log(p2) + Math.log(p3) + Math.log(p4));
    const geom_mean = Math.exp(log_mean);

    const BLEU = BP * geom_mean * 100.0;

    let qual = '', color = '#22543d';
    if (BLEU >= 50.0) { qual = 'VERY HIGH QUALITY (Fluent & accurate)'; color = '#22543d'; }
    else if (BLEU >= 40.0) { qual = 'HIGH QUALITY (Readable & mostly accurate)'; color = '#22543d'; }
    else if (BLEU >= 30.0) { qual = 'UNDERSTANDABLE (Acceptable translation)'; color = '#ea580c'; }
    else if (BLEU >= 20.0) { qual = 'ROUGH TRANSLATION (Substantial errors)'; color = '#ea580c'; }
    else { qual = 'POOR QUALITY (Hard to understand)'; color = '#c53030'; }

    blResEl.textContent = 'BLEU-4 Score = ' + BLEU.toFixed(1) + ' (' + qual.split(' (')[0] + ')';
    blResEl.style.color = color;
    bpResEl.textContent = 'Brevity Penalty BP = ' + BP.toFixed(3) + ' | Geometric Mean Precision = ' + (geom_mean * 100).toFixed(1) + '% (c=' + c + ', r=' + r + ')';
  }

  [cEl, rEl, p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter word count of candidate machine translation c.',
      'Enter word count of ground-truth reference human translation r.',
      'Enter modified 1-gram, 2-gram, 3-gram, and 4-gram precision fractions ($p_1$ to $p_4$).',
      'Inspect standard BLEU-4 score (0 to 100) and Brevity Penalty (BP).'
    ],
    benefitTitle: 'Kishore Papineni et al. 2002 BLEU Metric',
    benefitContent: 'Evaluates n-gram overlap while penalizing artificially truncated outputs via Brevity Penalty, providing the benchmark standard for neural machine translation research.',
    faqs: [{ q: 'What is considered a good BLEU score in machine translation?', a: 'BLEU scores above 40 indicate high-quality, fluent translations; human translators typically score between 50 and 60 against another reference translator.' }]
  },

  // 25. Support Vector Machine (SVM) Maximum Margin Hyperplane Calculator
  {
    slug: 'support-vector-machine-svm-maximum-margin-hyperplane-calculator',
    name: 'Support Vector Machine (SVM Maximum Margin = 2 / ‖w‖ & Hinge Loss) Calculator',
    description: 'Calculate linear Support Vector Machine (SVM) geometric separating margin width (Margin = 2 / ‖w‖), functional margin y_i·(w·x + b), and Hinge Loss (max(0, 1 - y_i·(w·x + b))) for maximum-margin classification.',
    category: 'Math',
    icon: 'text',
    keywords: ['svm calculator', 'support vector machine margin formula 2 over norm w online', 'hinge loss svm classifier calculator', 'maximum margin hyperplane support vectors calculator', 'machine learning supervised learning svm online'],
    order: 1234,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weight Vector Norm ‖w‖, Functional Margin Score y·(w·x + b) & Soft Margin Penalty C',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sv-w">Weight Norm ‖w‖</label>
          <input class="tool-textarea" id="sv-w" type="number" step="0.5" value="2.00" placeholder="2.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sv-func">Functional y·(w·x+b)</label>
          <input class="tool-textarea" id="sv-func" type="number" step="0.2" value="0.80" placeholder="0.80 (Inside Margin)" />
        </div>
      </div>
      <div id="sv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sv-res-margin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Geometric Margin = 1.000 (Width = 2 / ‖w‖)</span>
            <span class="stat-label">Maximum Geometric Separating Margin Width</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sv-res-hinge" style="color:var(--green-dark); font-weight:700;">Hinge Loss = 0.200 (Support Vector: Violates margin boundary by 0.20)</span>
            <span class="stat-label">Hinge Loss (max(0, 1 - y·f(x))) & Support Vector Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('sv-w'), fnEl = document.getElementById('sv-func');
  const mgResEl = document.getElementById('sv-res-margin'), hgResEl = document.getElementById('sv-res-hinge');

  function update() {
    const norm_w = parseFloat(wEl.value), func_margin = parseFloat(fnEl.value);
    if (isNaN(norm_w) || isNaN(func_margin) || norm_w <= 0) return;

    // Geometric margin width = 2 / ||w||
    const geom_margin = 2.0 / norm_w;

    // Hinge loss = max(0, 1 - func_margin)
    const hinge_loss = Math.max(0.0, 1.0 - func_margin);

    let svStatus = '', color = '#22543d';
    if (func_margin > 1.0) {
      svStatus = 'CORRECTLY CLASSIFIED (Outside margin: Hinge loss = 0, not a support vector)';
      color = '#22543d';
    } else if (func_margin === 1.0) {
      svStatus = 'ON MARGIN BOUNDARY (Exact Support Vector: Hinge loss = 0)';
      color = '#22543d';
    } else if (func_margin >= 0) {
      svStatus = 'MARGIN VIOLATION (Inside margin street, correct side: Active Support Vector)';
      color = '#ea580c';
    } else {
      svStatus = 'MISCLASSIFIED (Wrong side of hyperplane: Severe penalty)';
      color = '#c53030';
    }

    mgResEl.textContent = 'Geometric Margin = ' + geom_margin.toFixed(3) + ' (Width = 2/‖w‖)';
    hgResEl.textContent = 'Hinge Loss = ' + hinge_loss.toFixed(3) + ' | ' + svStatus.split(' (')[0];
    hgResEl.style.color = color;
  }

  wEl.addEventListener('input', update);
  fnEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Euclidean norm of weight vector $\|\mathbf{w}\|$.',
      'Enter functional margin score $y_i (\mathbf{w}^T \mathbf{x}_i + b)$.',
      'Inspect geometric margin width ($\frac{2}{\|\mathbf{w}\|}$), Hinge Loss, and identify active support vectors.'
    ],
    benefitTitle: 'Vladimir Vapnik 1995 Maximum-Margin Hyperplane',
    benefitContent: 'SVM minimizes $\|\mathbf{w}\|^2 / 2$ to maximize the geometric margin ($2/\|\mathbf{w}\|$), maximizing generalization robustness by relying solely on the critical boundary support vectors.',
    faqs: [{ q: 'What is a support vector in SVM?', a: 'Support vectors are the training points that lie on or violate the margin boundary ($y_i(\mathbf{w}^T\mathbf{x}_i + b) \le 1$); moving any non-support vector has zero effect on the separating hyperplane.' }]
  }
];

pack43Tools.forEach(createTool);
console.log('Pack 43 complete: ' + pack43Tools.length + ' tools created.');
